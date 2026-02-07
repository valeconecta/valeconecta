import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabaseClient';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { Role } from './auth/enums/role.enum';

// Profile data stored in our public.users table
export interface UserProfile {
    id: string;
    full_name: string;
    role: Role;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, fullName: string, role: Role) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
        };
        
        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    // Fetch profile whenever the user object changes
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('id, full_name, role')
                    .eq('id', user.id)
                    .single();
                
                if (error) {
                    console.error("Error fetching user profile:", error);
                    setProfile(null);
                } else {
                    setProfile(data as UserProfile);
                }
            }
        };

        if (user && !profile) {
            fetchProfile();
        } else if (!user) {
            setProfile(null);
        }
    }, [user, profile]);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };
    
    const signUp = async (email: string, password: string, fullName: string, role: Role) => {
        // Automatically assign ADMIN role to a specific email for seeding purposes.
        const finalRole = email.toLowerCase() === 'surfads02@gmail.com' ? Role.ADMIN : role;

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: finalRole
                }
            }
        });
        
        if (authError) return { error: authError };
        if (!authData.user) return { error: new AuthError("User not found after sign up.") };

        // Supabase has a trigger that copies user to public.users table.
        // For professional role, we create additional profiles.
        if (finalRole === Role.PROFESSIONAL) {
            // 1. Create professional profile
            const { data: profProfile, error: profError } = await supabase
                .from('professionals')
                .insert({ user_id: authData.user.id, name: fullName }) // Use user_id and name
                .select()
                .single();
            
            if (profError) {
              console.error("Error creating professional profile:", profError);
              return { error: profError as AuthError };
            }

            // 2. Create wallet for the professional profile
            const { error: walletError } = await supabase
                .from('wallets')
                .insert({
                    professional_id: profProfile.id,
                    balance_pending: 0,
                    balance_available: 0,
                    credits_balance: 20 // 20 free credits for new pros
                });
            
            if (walletError) {
              console.error("Error creating wallet:", walletError);
              return { error: walletError as AuthError };
            }
        }
        
        await supabase.auth.refreshSession();
        return { error: null };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    const value = {
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
