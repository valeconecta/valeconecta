
import React from 'react';
import { publicProfile } from '../../../data/professionalMockData';
import { EditIcon, StarIcon } from '../../Icons';

const EditableField: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="group relative">
        {children}
        <button className="absolute top-0 right-0 -mt-2 -mr-2 bg-white p-1 rounded-full shadow border text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <EditIcon className="h-4 w-4"/>
        </button>
    </div>
);

const ProfileView: React.FC = () => {
    const { name, photoUrl, bio, categories, baseRate, rating, reviewCount, medalhas, totalServices, reviews } = publicProfile;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Meu Perfil Público</h1>
            <p className="text-gray-600 mb-6">É assim que os clientes veem seu perfil. Clique para editar.</p>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <EditableField>
                        <img src={photoUrl} alt={name} className="w-32 h-32 rounded-full ring-4 ring-offset-2 ring-[#2A8C82]" />
                    </EditableField>
                    <div className="flex-1 text-center sm:text-left">
                        <EditableField>
                            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                        </EditableField>
                        <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-gray-600">
                            <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                            <span className="font-bold text-gray-800">{rating.toFixed(1)}</span>
                            <span className="ml-1">({reviewCount} avaliações)</span>
                            <span className="mx-2">|</span>
                            <span>{totalServices} serviços feitos</span>
                        </div>
                         <EditableField>
                            <p className="mt-2 text-gray-600 max-w-xl">{bio}</p>
                        </EditableField>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Medalhas */}
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-3">Medalhas Conquistadas</h3>
                            <div className="flex flex-wrap gap-2">
                                {medalhas.map(medalha => (
                                    <span key={medalha} className="bg-[#E8F3F1] text-[#2A8C82] text-xs font-semibold px-3 py-1.5 rounded-full">{medalha}</span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-3">Últimas Avaliações</h3>
                            <div className="space-y-4">
                                {reviews.map((review, i) => (
                                    <div key={i} className="border-l-4 border-gray-200 pl-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
                                        </div>
                                        <p className="italic text-gray-600 mt-1">"{review.comment}"</p>
                                        <p className="text-sm font-semibold text-gray-800 mt-1">- {review.client}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                             <EditableField>
                                <h4 className="font-bold text-gray-800">Preço Base</h4>
                                <p className="text-2xl font-bold text-gray-800">{baseRate.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}<span className="text-base font-normal text-gray-600">/hora</span></p>
                             </EditableField>
                        </div>
                         <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                            <EditableField>
                                <h4 className="font-bold text-gray-800 mb-2">Especialidades</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {categories.map(cat => <li key={cat}>{cat}</li>)}
                                </ul>
                            </EditableField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
