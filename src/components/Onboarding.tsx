import { useState, useEffect } from 'react';
import { useStore } from '../store';
import type { RegionType } from '../types';

const CUISINES: RegionType[] = ['North Indian', 'South Indian', 'Maharashtrian', 'Gujarati', 'Indo-Chinese', 'Continental'];
const TIMES = [15, 30, 45, 60, null];

export default function Onboarding() {
  const { preferences, setPreferences, completeOnboarding } = useStore();
  const [step, setStep] = useState(1);
  const [loadingStep, setLoadingStep] = useState(0);

  // Local state for preferences before saving
  const [selCuisines, setSelCuisines] = useState<RegionType[]>(preferences.cuisines || []);
  const [selTime, setSelTime] = useState<number | null>(preferences.maxTime || null);
  const [selDiets, setSelDiets] = useState(preferences.diets || []);

  const handleNext = () => setStep(2);
  
  const handleSaveAndGenerate = () => {
    setPreferences({
      cuisines: selCuisines,
      maxTime: selTime,
      diets: selDiets
    });
    setStep(3);
  };

  useEffect(() => {
    if (step === 3) {
      const timers = [
        setTimeout(() => setLoadingStep(1), 800),
        setTimeout(() => setLoadingStep(2), 1600),
        setTimeout(() => setLoadingStep(3), 2500),
        setTimeout(() => {
          completeOnboarding();
        }, 3200)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [step, completeOnboarding]);

  const toggleCuisine = (c: RegionType) => {
    setSelCuisines(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleDiet = (d: any) => {
    setSelDiets(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: 'var(--bg)' }}>
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="text-6xl mb-6 animate-float">🤔</div>
          <h1 className="font-display text-4xl mb-4" style={{ color: 'var(--text)' }}>Kya Banaon?</h1>
          <p className="text-lg opacity-70 mb-12 max-w-xs" style={{ color: 'var(--sub)' }}>
            Every day, the exact same question. Let us do the thinking for you.
          </p>
          <button onClick={handleNext}
            className="w-full max-w-xs py-4 rounded-2xl text-lg font-bold text-white transition-transform active:scale-95"
            style={{ background: 'var(--primary)', boxShadow: '0 8px 32px var(--primary-glow)' }}>
            Get Started
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col p-6 animate-slide-up overflow-y-auto">
          <h2 className="font-display text-3xl mb-2" style={{ color: 'var(--text)' }}>Personalize</h2>
          <p className="text-sm opacity-70 mb-8" style={{ color: 'var(--sub)' }}>Tell us what you like to eat.</p>

          <div className="mb-8">
            <h3 className="font-bold mb-3 text-sm tracking-wider uppercase opacity-60" style={{ color: 'var(--sub)' }}>Favorite Cuisines</h3>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map(c => (
                <button key={c} onClick={() => toggleCuisine(c)}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
                  style={{
                    background: selCuisines.includes(c) ? 'var(--primary)' : 'var(--surface2)',
                    color: selCuisines.includes(c) ? '#fff' : 'var(--sub)',
                    border: `1px solid ${selCuisines.includes(c) ? 'var(--primary)' : 'var(--border)'}`
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-3 text-sm tracking-wider uppercase opacity-60" style={{ color: 'var(--sub)' }}>Max Cooking Time</h3>
            <div className="flex flex-wrap gap-2">
              {TIMES.map(t => (
                <button key={t || 'any'} onClick={() => setSelTime(t)}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
                  style={{
                    background: selTime === t ? 'var(--primary)' : 'var(--surface2)',
                    color: selTime === t ? '#fff' : 'var(--sub)',
                    border: `1px solid ${selTime === t ? 'var(--primary)' : 'var(--border)'}`
                  }}>
                  {t ? `< ${t} mins` : 'Unlimited'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-bold mb-3 text-sm tracking-wider uppercase opacity-60" style={{ color: 'var(--sub)' }}>Dietary Baseline</h3>
            <div className="flex flex-col gap-3">
              {[
                { id: 'sattvic', label: 'Strictly Sattvic (No Onion/Garlic)' },
                { id: 'oilFree', label: 'Prefer Oil-Free / Healthy' },
                { id: 'kids', label: 'Kid Friendly Only' }
              ].map(d => (
                <label key={d.id} className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}>
                  <input type="checkbox" checked={selDiets.includes(d.id as any)} onChange={() => toggleDiet(d.id)} 
                    className="w-5 h-5 accent-[var(--primary)]" />
                  <span className="font-bold text-sm" style={{ color: 'var(--text)' }}>{d.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleSaveAndGenerate}
            className="w-full mt-auto py-4 rounded-2xl text-lg font-bold text-white transition-transform active:scale-95"
            style={{ background: 'var(--primary)', boxShadow: '0 8px 32px var(--primary-glow)' }}>
            Generate My Week ✨
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 rounded-full border-[var(--primary)] border-t-transparent animate-spin" />
            <div className="absolute inset-2 border-4 rounded-full border-[var(--c-l)] border-b-transparent animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">✨</div>
          </div>
          
          <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--text)' }}>Building Your Week</h2>
          <div className="h-6 overflow-hidden">
            <div className={`transition-transform duration-500 flex flex-col gap-6 text-sm font-bold opacity-60`}
              style={{ color: 'var(--sub)', transform: `translateY(-${loadingStep * 24}px)` }}>
              <div className="h-6">Analyzing your preferences...</div>
              <div className="h-6">Filtering cuisines...</div>
              <div className="h-6">Checking preparation times...</div>
              <div className="h-6">Finalizing menu!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
