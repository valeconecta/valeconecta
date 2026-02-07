import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Termos de Serviço</h1>
                    <p className="text-sm text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
                            <p>
                                Ao se cadastrar e utilizar a plataforma Vale Conecta ("Plataforma"), você ("Usuário") concorda em cumprir e estar legalmente vinculado a estes Termos de Serviço ("Termos"). Estes Termos regem seu acesso e uso da Plataforma. Se você não concorda com estes Termos, não tem o direito de obter informações ou continuar utilizando a Plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Descrição dos Serviços</h2>
                            <p>
                                A Vale Conecta é uma plataforma online que conecta Usuários que buscam serviços domésticos ("Clientes") com prestadores de serviços qualificados ("Profissionais" ou "Conectados"). A Vale Conecta atua como uma intermediária, facilitando a comunicação, o agendamento e o pagamento dos serviços. A Vale Conecta não é empregadora dos Profissionais nem a prestadora final dos serviços contratados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Contas de Usuário</h2>
                            <p className="mb-2">
                                Para acessar certos recursos da Plataforma, você deve se registrar e criar uma conta. Você concorda em:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Fornecer informações precisas, atuais e completas durante o processo de registro.</li>
                                <li>Manter a segurança de sua senha e não divulgá-la a terceiros.</li>
                                <li>Ser o único responsável por todas as atividades que ocorram em sua conta.</li>
                                <li>Ter pelo menos 18 anos de idade.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Papéis e Responsabilidades</h2>
                            <p className="font-semibold mb-2">Clientes:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
                                <li>São responsáveis por fornecer descrições claras e precisas das tarefas que desejam contratar.</li>
                                <li>Concordam em tratar os Profissionais com respeito e fornecer um ambiente de trabalho seguro.</li>
                                <li>Comprometem-se a efetuar o pagamento do serviço através da plataforma assim que a proposta de um Profissional for aceita.</li>
                            </ul>
                             <p className="font-semibold mb-2">Profissionais ("Conectados"):</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Concordam em fornecer informações precisas sobre suas qualificações e experiência.</li>
                                <li>Comprometem-se a realizar os serviços contratados com profissionalismo, qualidade e pontualidade.</li>
                                <li>Entendem que o uso de créditos para enviar propostas é um investimento e não garante a contratação.</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Pagamentos, Taxas e Créditos</h2>
                            <p>
                                <strong>Pagamento Seguro (Escrow):</strong> Quando um Cliente aceita uma proposta, o valor total do serviço é cobrado e retido pela Vale Conecta. O pagamento só é liberado para o Profissional 3 (três) dias após o Cliente confirmar a conclusão do serviço, garantindo segurança para ambas as partes.
                            </p>
                            <p className="mt-2">
                                <strong>Taxas de Serviço:</strong> A Vale Conecta cobra uma taxa de serviço (comissão) sobre o valor de cada transação para cobrir os custos operacionais da plataforma. Essa taxa é deduzida do valor repassado ao Profissional.
                            </p>
                            <p className="mt-2">
                                <strong>Créditos:</strong> Profissionais devem adquirir pacotes de créditos para enviar propostas aos Clientes. O custo em créditos de cada proposta pode variar. Créditos não são reembolsáveis.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">6. Resolução de Disputas</h2>
                            <p>
                                Em caso de desacordo entre um Cliente e um Profissional sobre um serviço, ambas as partes devem tentar resolver a questão amigavelmente através do chat da plataforma. Se não houver acordo, uma das partes pode abrir um ticket de disputa. A equipe da Vale Conecta atuará como mediadora, analisando as evidências fornecidas para chegar a uma resolução justa, que pode incluir o reembolso parcial ou total ao Cliente ou a liberação do pagamento ao Profissional.
                            </p>
                        </section>
                        
                         <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">7. Limitação de Responsabilidade</h2>
                            <p>
                                A Vale Conecta é uma plataforma de intermediação e não se responsabiliza pela qualidade, segurança ou legalidade dos serviços prestados pelos Profissionais, nem pela veracidade das informações fornecidas pelos Usuários. A responsabilidade da Vale Conecta limita-se a garantir o funcionamento da plataforma e do sistema de pagamento seguro.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Alterações nos Termos</h2>
                            <p>
                                A Vale Conecta reserva-se o direito de modificar estes Termos a qualquer momento. Se fizermos alterações, publicaremos os Termos revisados na Plataforma e atualizaremos a data da "Última atualização". O uso continuado da Plataforma após tais alterações constituirá sua aceitação dos novos Termos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">9. Contato</h2>
                            <p>
                                Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através da nossa Central de Ajuda ou pelo e-mail: <a href="mailto:contato@valeconecta.com" className="text-[#2A8C82] hover:underline">contato@valeconecta.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
