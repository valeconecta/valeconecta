import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { XIcon, ImageIcon, SpinnerIcon, Trash2Icon } from '../Icons';
import { categories } from '../../data/professionals';
import { createTask, getAddressesByUserId } from '../../supabaseService';
import { useAuth } from '../../AuthContext';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

interface TaskData {
    description: string;
    category: string;
    photos: { name: string; url: string }[];
    address: string;
    deadline: string;
}

interface Address {
  id: number;
  name: string;
  full_address: string;
}

const STEPS = ['Descrição', 'Detalhes', 'Revisão'];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onTaskCreated }) => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [userAddresses, setUserAddresses] = useState<Address[]>([]);
    const [taskData, setTaskData] = useState<TaskData>({
        description: '',
        category: '',
        photos: [],
        address: '',
        deadline: 'O mais rápido possível'
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const fetchAddressesAndReset = async () => {
        if (isOpen && user) {
          try {
            const addresses = await getAddressesByUserId(user.id);
            setUserAddresses(addresses || []);
            // Reset state when modal opens
            setCurrentStep(0);
            setTaskData({
              description: '', category: '', photos: [],
              address: addresses?.[0]?.full_address || '',
              deadline: 'O mais rápido possível'
            });
          } catch (error) {
            console.error("Failed to fetch user addresses:", error);
          }
        }
      };
      fetchAddressesAndReset();
    }, [isOpen, user]);
    
    if (!isOpen) return null;

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));
    const goToStep = (step: number) => setCurrentStep(step);

    const handleDataChange = (field: keyof TaskData, value: any) => {
        setTaskData(prev => ({...prev, [field]: value }));
    };

    const handleAnalyzeDescription = async () => {
        if (!taskData.description.trim()) {
            alert('Por favor, descreva o serviço primeiro.');
            return;
        }
        setIsAnalyzing(true);
        try {
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY as string});
            const prompt = `Analise a seguinte descrição de um serviço doméstico e retorne um objeto JSON com uma única chave "categoria". A categoria deve ser a mais relevante da seguinte lista: [${categories.join(', ')}].\n\nDescrição do serviço: "${taskData.description}"\n\nResponda APENAS com o objeto JSON.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            categoria: { type: Type.STRING }
                        },
                        required: ['categoria']
                    }
                }
            });

            if (response.text) {
                const cleanedText = response.text.trim().replace(/^```json\s*|```\s*$/g, '');
                const result = JSON.parse(cleanedText) as { categoria: string };
                if (result.categoria && categories.includes(result.categoria)) {
                    handleDataChange('category', result.categoria);
                }
            }
        } catch (error) {
            console.error("Erro ao analisar com Gemini:", error);
            alert("Não foi possível analisar a descrição. Por favor, selecione uma categoria manualmente.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 4 - taskData.photos.length);
            const newPhotos = files.map((file: File) => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));
            setTaskData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
        }
    };
    
    const removePhoto = (photoUrl: string) => {
        const photoToRemove = taskData.photos.find(p => p.url === photoUrl);
        if (photoToRemove) {
            URL.revokeObjectURL(photoToRemove.url);
            setTaskData(prev => ({...prev, photos: prev.photos.filter(p => p.url !== photoUrl)}));
        }
    };

    const handlePublish = async () => {
        if (!user) {
            alert("Você precisa estar logado para criar uma tarefa.");
            return;
        }
        try {
            await createTask({ 
                description: taskData.description, 
                category: taskData.category,
                clientId: user.id
            });
            onTaskCreated();
        } catch (error) {
            alert("Houve um erro ao publicar sua tarefa. Tente novamente.");
            console.error(error);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return (
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Passo 1: Descreva o serviço</h2>
                    <p className="text-sm text-gray-500 mt-1">Quanto mais detalhes, melhores as propostas.</p>
                    <textarea value={taskData.description} onChange={e => handleDataChange('description', e.target.value)} rows={6} placeholder="Ex: Preciso montar um guarda-roupa de 6 portas no meu quarto. Já tenho o manual e todas as peças." className="w-full mt-4 p-2 border border-gray-300 rounded-md"/>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <div className="flex items-center space-x-2 mt-1">
                            <select value={taskData.category} onChange={e => handleDataChange('category', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md">
                                <option value="">Selecione a categoria</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <button onClick={handleAnalyzeDescription} disabled={isAnalyzing} className="flex items-center justify-center bg-[#2A8C82] text-white px-4 py-2 rounded-md font-semibold text-sm disabled:bg-gray-400">
                                {isAnalyzing ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : 'Analisar Descrição'}
                            </button>
                        </div>
                    </div>
                </div>
            );
            case 1: return (
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Passo 2: Adicione detalhes</h2>
                    <p className="text-sm text-gray-500 mt-1">Ajude o profissional a entender o contexto.</p>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Endereço do Serviço</label>
                            <select value={taskData.address} onChange={e => handleDataChange('address', e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                {userAddresses.map(addr => <option key={addr.id} value={addr.full_address}>{addr.name} - {addr.full_address}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700">Fotos (opcional, máx 4)</label>
                             <div className="mt-1 flex items-center space-x-2">
                                <button onClick={() => fileInputRef.current?.click()} className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400">
                                    <ImageIcon className="h-8 w-8"/>
                                    <span className="text-sm mt-1">Adicionar fotos</span>
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden"/>
                             </div>
                             <div className="mt-2 grid grid-cols-4 gap-2">
                                {taskData.photos.map(photo => (
                                    <div key={photo.url} className="relative">
                                        <img src={photo.url} alt={photo.name} className="w-full h-16 object-cover rounded-md" />
                                        <button onClick={() => removePhoto(photo.url)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><XIcon className="h-3 w-3"/></button>
                                    </div>
                                ))}
                             </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700">Qual seu prazo?</label>
                             <div className="mt-1 grid grid-cols-2 gap-2">
                                {['O mais rápido possível', 'Nesta semana', 'Sem pressa', 'Data específica'].map(option => (
                                    <button key={option} onClick={() => handleDataChange('deadline', option)} className={`p-2 border rounded-md text-sm ${taskData.deadline === option ? 'bg-[#E8F3F1] border-[#2A8C82] text-[#2A8C82] font-semibold' : 'border-gray-300'}`}>{option}</button>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Passo 3: Revise e publique</h2>
                    <p className="text-sm text-gray-500 mt-1">Confirme se está tudo certo antes de publicar.</p>
                    <div className="mt-4 space-y-4 text-sm bg-gray-50 p-4 rounded-md border">
                        <div className="pb-2 border-b">
                            <div className="flex justify-between items-center"><h4 className="font-semibold text-gray-800">Descrição</h4><button onClick={() => goToStep(0)} className="text-xs text-blue-600">Editar</button></div>
                            <p className="text-gray-600 mt-1 whitespace-pre-wrap">{taskData.description}</p>
                        </div>
                        <div className="pb-2 border-b">
                             <div className="flex justify-between items-center"><h4 className="font-semibold text-gray-800">Detalhes</h4><button onClick={() => goToStep(1)} className="text-xs text-blue-600">Editar</button></div>
                             <p className="text-gray-600 mt-1"><strong>Categoria:</strong> {taskData.category}</p>
                             <p className="text-gray-600 mt-1"><strong>Endereço:</strong> {taskData.address}</p>
                             <p className="text-gray-600 mt-1"><strong>Prazo:</strong> {taskData.deadline}</p>
                        </div>
                        <div>
                             <h4 className="font-semibold text-gray-800">Fotos</h4>
                             <div className="mt-1 grid grid-cols-4 gap-2">
                                {taskData.photos.map(photo => <img key={photo.url} src={photo.url} className="w-full h-16 object-cover rounded-md" />)}
                             </div>
                        </div>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold">Criar Nova Tarefa</h2>
                    <button onClick={onClose}><XIcon className="h-6 w-6 text-gray-500"/></button>
                </div>
                {/* Progress Bar */}
                <div className="p-4 border-b">
                    <div className="flex justify-between">
                        {STEPS.map((step, index) => (
                            <div key={step} className="flex-1 text-center">
                                <span className={`text-sm ${currentStep >= index ? 'font-bold text-[#2A8C82]' : 'text-gray-500'}`}>{step}</span>
                            </div>
                        ))}
                    </div>
                    <div className="relative w-full h-1 bg-gray-200 rounded-full mt-1">
                        <div className="absolute top-0 left-0 h-1 bg-[#2A8C82] rounded-full transition-all" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
                    </div>
                </div>
                
                <div className="p-6 flex-grow overflow-y-auto">{renderStepContent()}</div>
                
                <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                    {currentStep > 0 ? (
                        <button onClick={handleBack} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm">Voltar</button>
                    ) : <div></div>}
                    {currentStep < STEPS.length - 1 ? (
                        <button onClick={handleNext} className="px-4 py-2 bg-[#2A8C82] text-white rounded-lg font-semibold text-sm">Avançar</button>
                    ) : (
                        <button onClick={handlePublish} className="px-4 py-2 bg-[#2A8C82] text-white rounded-lg font-semibold text-sm">Publicar Tarefa</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
