import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../AuthContext';
import { Logo, SpinnerIcon, UsersIcon, WrenchIcon } from '../components/Icons';
import { Role } from '../auth/enums/role.enum';

interface RegisterPageProps {
  setCurrentPage: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentPage }) => {
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (!termsAccepted) {
      setError("Você deve aceitar os Termos de Serviço.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error } = await signUp(email, password, fullName, role);
      if (error) {
        throw error;
      }
      // Redirection is handled by App.tsx
    } catch (err: any) {
      if (err.message.includes('User already registered')) {
        setError('Este e-mail já está em uso.');
      } else {
        setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo className="mx-auto h-24 w-auto cursor-pointer" onClick={() => setCurrentPage('home')} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button onClick={() => setCurrentPage('login')} className="font-medium text-[#2A8C82] hover:text-[#206961]">
              Faça login
            </button>
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setRole(Role.CLIENT)}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
              role === Role.CLIENT ? 'border-[#2A8C82] bg-[#E8F3F1]' : 'border-gray-300 bg-white'
            }`}
          >
            <UsersIcon className={`h-8 w-8 mb-2 ${role === Role.CLIENT ? 'text-[#2A8C82]' : 'text-gray-500'}`} />
            <span className="font-semibold">Quero Contratar</span>
            <span className="text-xs text-gray-500">Sou um Cliente</span>
          </button>
          <button
            onClick={() => setRole(Role.PROFESSIONAL)}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
              role === Role.PROFESSIONAL ? 'border-[#2A8C82] bg-[#E8F3F1]' : 'border-gray-300 bg-white'
            }`}
          >
            <WrenchIcon className={`h-8 w-8 mb-2 ${role === Role.PROFESSIONAL ? 'text-[#2A8C82]' : 'text-gray-500'}`} />
            <span className="font-semibold">Quero Trabalhar</span>
            <span className="text-xs text-gray-500">Sou um Profissional</span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-3">
            <input name="name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2A8C82] focus:border-[#2A8C82] sm:text-sm" placeholder="Nome Completo" />
            <input name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2A8C82] focus:border-[#2A8C82] sm:text-sm" placeholder="E-mail" />
            <input name="password" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2A8C82] focus:border-[#2A8C82] sm:text-sm" placeholder="Senha (mín. 8 caracteres)" />
            <input name="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2A8C82] focus:border-[#2A8C82] sm:text-sm" placeholder="Confirmar Senha" />
          </div>

          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="h-4 w-4 text-[#2A8C82] focus:ring-[#2A8C82] border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Eu li e aceito os <button type="button" onClick={() => setCurrentPage('terms')} className="font-medium text-[#2A8C82] hover:text-[#206961] underline">Termos de Serviço</button>
            </label>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2A8C82] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A8C82] disabled:bg-gray-400">
              {loading ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : 'Criar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
