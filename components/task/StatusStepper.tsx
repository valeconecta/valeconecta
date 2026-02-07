
import React from 'react';
import { TaskStatus } from '../../data/taskDetailMockData';
import { CheckCircleIcon } from '../Icons';

interface StatusStepperProps {
  currentStatus: TaskStatus;
}

const steps: TaskStatus[] = ['Agendado', 'Em Andamento', 'Concluído', 'Avaliado'];

const StatusStepper: React.FC<StatusStepperProps> = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="w-full pb-6 mb-4 border-b border-gray-200">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex || currentStatus === 'Avaliado' || (currentStatus === 'Confirmado Pelo Cliente' && index < 3);

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isCompleted ? 'bg-green-500' : isActive ? 'bg-[#2A8C82]' : 'bg-gray-300'}`}>
                  {isCompleted ? <CheckCircleIcon className="h-5 w-5 text-white" /> : <span className="text-white font-bold">{index + 1}</span>}
                </div>
                <p className={`mt-2 text-xs text-center font-semibold transition-colors duration-300 ${isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                  {step === 'Concluído' && currentStatus === 'Confirmado Pelo Cliente' ? 'Finalizado' : step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 transition-colors duration-300 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StatusStepper;
