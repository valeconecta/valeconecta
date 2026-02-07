import { supabase } from './supabaseClient';
import { Professional } from './types'; // Usaremos um tipo mais robusto
import { DetailedProfessional, Review } from './types';

// USER & PROFILE
export const getUserProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('id, full_name, role')
        .eq('id', userId)
        .single();
    if (error) throw error;
    return data;
}

export const updateUserProfile = async (userId: string, updates: { full_name: string }) => {
    const { data, error } = await supabase
        .from('users')
        .update({ name: updates.full_name }) // Corrigido para 'name'
        .eq('id', userId);
    if (error) throw error;
    return data;
}

// ADDRESSES
export const getAddressesByUserId = async (userId: string) => {
    const { data, error } = await supabase
        .from('addresses')
        .select('id, name, full_address')
        .eq('user_id', userId);
    if (error) throw error;
    return data;
}

export const addAddress = async (userId: string, address: { name: string, fullAddress: string }) => {
    const { data, error } = await supabase
        .from('addresses')
        .insert([{ user_id: userId, name: address.name, full_address: address.fullAddress }])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export const removeAddress = async (addressId: number) => {
    const { error } = await supabase.from('addresses').delete().eq('id', addressId);
    if (error) throw error;
}


// PROFESSIONALS
export const getProfessionals = async (options: { limit?: number } = {}): Promise<Professional[]> => {
    let query = supabase.from('professionals').select('*');
    if (options.limit) {
        query = query.limit(options.limit);
    }
    const { data, error } = await query;
    if (error) {
        console.error('Error fetching professionals:', error);
        throw error;
    }
    return data || [];
};

export const getProfessionalById = async (id: number): Promise<DetailedProfessional | null> => {
    const { data, error } = await supabase
        .from('professionals')
        .select(`
            *,
            reviews (
                id,
                client_name,
                date,
                rating,
                comment,
                service,
                professional_reply
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching professional by ID:', error);
        throw error;
    }
    return data as DetailedProfessional | null;
};

// TASKS
export const createTask = async (task: { description: string, category: string, clientId: string }) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([{ 
            title: task.description.substring(0, 50) + (task.description.length > 50 ? '...' : ''),
            description: task.description, 
            category: task.category,
            client_id: task.clientId,
            status: 'AWAITING_PROPOSALS'
        }]);
    
    if (error) throw error;
    return data;
}

export const getTasksByClientId = async (clientId: string) => {
     const { data, error } = await supabase
        .from('tasks')
        .select(`
            id,
            title,
            status,
            description,
            scheduled_date,
            evaluation_pending,
            professionals ( name )
        `)
        .eq('client_id', clientId);
    if (error) throw error;
    return data || [];
}

// PROPOSALS
export const getProposalsByTaskId = async (taskId: number) => {
    const { data, error } = await supabase
        .from('proposals')
        .select(`
            *,
            professionals ( * )
        `)
        .eq('task_id', taskId);
    if (error) throw error;
    return data;
}

export const createProposal = async (proposal: { taskId: number, professionalId: number, message: string, price: number }) => {
    // 1. Check professional's credits (simplified)
    const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('credits_balance')
        .eq('professional_id', proposal.professionalId)
        .single();
    
    if (walletError || !wallet) throw new Error("Carteira não encontrada.");

    const creditsCost = 5; // Custo Fixo para simplificar
    if (wallet.credits_balance < creditsCost) {
        throw new Error("Créditos insuficientes.");
    }

    // 2. Insert proposal
    const { error: proposalError } = await supabase.from('proposals').insert([{
        task_id: proposal.taskId,
        professional_id: proposal.professionalId,
        message: proposal.message,
        price: proposal.price,
        status: 'PENDING'
    }]);

    if (proposalError) throw proposalError;

    // 3. Deduct credits
    const { error: updateWalletError } = await supabase
        .from('wallets')
        .update({ credits_balance: wallet.credits_balance - creditsCost })
        .eq('professional_id', proposal.professionalId);
    
    if (updateWalletError) throw updateWalletError;
    
    return { success: true };
}

export const acceptProposal = async (taskId: number, proposalId: number, professionalId: number) => {
     // 1. Update task status to SCHEDULED and assign professional
    const { error: taskUpdateError } = await supabase
        .from('tasks')
        .update({ status: 'SCHEDULED', professional_id: professionalId })
        .eq('id', taskId);
    
    if (taskUpdateError) throw taskUpdateError;

    // 2. Update accepted proposal status
     const { error: proposalUpdateError } = await supabase
        .from('proposals')
        .update({ status: 'ACCEPTED' })
        .eq('id', proposalId);

    if (proposalUpdateError) throw proposalUpdateError;

    // 3. (Opcional) Rejeitar outras propostas para esta tarefa
     const { error: rejectOthersError } = await supabase
        .from('proposals')
        .update({ status: 'REJECTED' })
        .eq('task_id', taskId)
        .neq('id', proposalId);

    if (rejectOthersError) console.error("Error rejecting other proposals:", rejectOthersError);

    return { success: true };
}
