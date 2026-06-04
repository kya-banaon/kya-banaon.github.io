import { useState } from 'react';
import { useStore } from '../store';

const STEPS = [
  {
    icon: '✨',
    title: 'Your personalized week is ready!',
    desc: 'We analyzed your preferences and generated a perfect 7-day meal plan.'
  },
  {
    icon: '🔄',
    title: 'Not feeling it?',
    desc: 'Tap the circular arrow (↺) on any dish to instantly swap it out for another recommendation.'
  },
  {
    icon: '🛒',
    title: 'Groceries, Automated.',
    desc: 'Head to the Groceries tab. Your entire shopping list has already been compiled and combined for you!'
  }
];

export default function Tour() {
  const { showTour, completeTour } = useStore();
  const [step, setStep] = useState(0);

  if (!showTour) return null;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else completeTour();
  };

  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
        
        <div className="text-5xl mb-6 animate-bounce">{current.icon}</div>
        <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--text)' }}>{current.title}</h2>
        <p className="text-sm opacity-80 mb-8 leading-relaxed" style={{ color: 'var(--sub)' }}>{current.desc}</p>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-colors"
                style={{ background: i === step ? 'var(--primary)' : 'var(--border)' }} />
            ))}
          </div>
          <button onClick={handleNext}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-transform active:scale-95"
            style={{ background: 'var(--primary)', boxShadow: '0 4px 16px var(--primary-glow)' }}>
            {step === STEPS.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
