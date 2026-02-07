import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Política de Privacidade</h1>
                    <p className="text-sm text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Introdução</h2>
                            <p>
                                Bem-vindo à Vale Conecta ("nós", "nosso"). Estamos comprometidos em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nossa plataforma. Ao acessar ou usar nosso serviço, você concorda com a coleta e uso de informações de acordo com esta política.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Informações que Coletamos</h2>
                            <p className="mb-2">Podemos coletar vários tipos de informações, incluindo:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>
                                    <strong>Informações de Identificação Pessoal:</strong> Nome, endereço de e-mail, endereço residencial, número de telefone e outros dados que você fornece ao se registrar.
                                </li>
                                <li>
                                    <strong>Informações de Profissionais:</strong> Além dos dados acima, podemos coletar informações de verificação de identidade (como documentos), qualificações, portfólio e dados bancários para processamento de pagamentos.
                                </li>
                                <li>
                                    <strong>Informações de Transações:</strong> Detalhes sobre os serviços que você solicita ou oferece, pagamentos processados através da plataforma (gerenciados por um processador de pagamentos seguro) e comunicações entre usuários.
                                </li>
                                <li>
                                    <strong>Dados de Uso:</strong> Informações sobre como você acessa e usa a plataforma, como seu endereço IP, tipo de navegador, páginas visitadas e horários de acesso.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Como Usamos Suas Informações</h2>
                            <p className="mb-2">Utilizamos as informações coletadas para diversas finalidades:</p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Para fornecer, operar e manter nossa plataforma.</li>
                                <li>Para facilitar a conexão entre Clientes e Profissionais.</li>
                                <li>Para processar transações e pagamentos de forma segura.</li>
                                <li>Para verificar a identidade dos Profissionais e garantir a segurança da plataforma.</li>
                                <li>Para nos comunicarmos com você, incluindo o envio de notificações, atualizações e respostas a solicitações de suporte.</li>
                                <li>Para melhorar e personalizar sua experiência, e para analisar o uso da plataforma.</li>
                                <li>Para prevenir fraudes e atividades ilegais.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Compartilhamento de Informações</h2>
                            <p>Não vendemos suas informações pessoais. Podemos compartilhar suas informações nas seguintes situações:</p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>
                                    <strong>Entre Usuários:</strong> Compartilhamos informações necessárias entre Clientes e Profissionais para que possam negociar e realizar um serviço (ex: nome, detalhes da tarefa, avaliações).
                                </li>
                                <li>
                                    <strong>Com Provedores de Serviço:</strong> Podemos compartilhar dados com empresas terceirizadas que nos auxiliam a operar a plataforma, como processadores de pagamento e provedores de hospedagem em nuvem (como o Supabase).
                                </li>
                                <li>
                                    <strong>Por Obrigações Legais:</strong> Podemos divulgar suas informações se formos obrigados por lei ou em resposta a solicitações válidas de autoridades públicas.
                                </li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Segurança dos Dados</h2>
                            <p>
                                A segurança de suas informações é uma prioridade. Usamos medidas de segurança administrativa, técnica e física para proteger seus dados pessoais. Utilizamos serviços robustos como o Supabase, que emprega as melhores práticas de segurança. No entanto, lembre-se que nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">6. Seus Direitos</h2>
                            <p>
                                Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você pode gerenciar a maioria de suas informações diretamente na página de perfil do seu painel. Para outras solicitações, entre em contato conosco.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">7. Alterações a Esta Política</h2>
                            <p>
                                Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data da "última atualização". Recomendamos que você revise esta página periodicamente.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Contato</h2>
                            <p>
                                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através da nossa Central de Ajuda ou pelo e-mail: <a href="mailto:privacidade@valeconecta.com" className="text-[#2A8C82] hover:underline">privacidade@valeconecta.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
