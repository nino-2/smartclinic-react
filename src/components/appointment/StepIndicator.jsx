import React from 'react';

export function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Appointment Details' },
    { number: 3, label: 'Confirmation' }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step.number
                  ? 'bg-[#1976D2] text-white'
                  : 'bg-[#E3F2FD] text-[#666]'
              }`}>
                {step.number}
              </div>
              <span className={`text-sm ${
                currentStep >= step.number
                  ? 'font-medium text-[#1976D2]'
                  : 'text-[#666]'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-0.5 bg-[#E3F2FD]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
