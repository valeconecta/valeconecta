
import React, { useState, useMemo } from 'react';

const EarningsCalculator: React.FC = () => {
    const [hours, setHours] = useState(20);
    const [rate, setRate] = useState(50);

    const weeklyEarnings = useMemo(() => hours * rate, [hours, rate]);
    const monthlyEarnings = useMemo(() => weeklyEarnings * 4, [weeklyEarnings]);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-[#333333] text-center">Calculadora de Ganhos</h3>
            <p className="text-[#666666] text-center mt-2">Veja uma estimativa do seu potencial de ganhos mensais.</p>

            <div className="mt-8 space-y-6">
                <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-[#333333]">Horas trabalhadas por semana</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <input
                            id="hours"
                            type="range"
                            min="1"
                            max="60"
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="w-full h-2 bg-[#E8F3F1] rounded-lg appearance-none cursor-pointer"
                            style={{ accentColor: '#2A8C82' }}
                        />
                        <span className="font-semibold text-[#2A8C82] w-12 text-center">{hours}h</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-[#333333]">Valor médio por hora de serviço</label>
                    <div className="flex items-center space-x-4 mt-1">
                         <input
                            id="rate"
                            type="range"
                            min="20"
                            max="200"
                            step="5"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-[#E8F3F1] rounded-lg appearance-none cursor-pointer"
                            style={{ accentColor: '#2A8C82' }}
                        />
                        <span className="font-semibold text-[#2A8C82] w-12 text-center">R${rate}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-300 text-center">
                <p className="text-lg text-[#666666]">Ganhos mensais estimados:</p>
                <p className="text-4xl font-extrabold text-[#2A8C82] mt-2">
                    {monthlyEarnings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
            </div>
        </div>
    );
};

export default EarningsCalculator;
