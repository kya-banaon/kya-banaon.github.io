import { useStore } from '../store';
import type { FilterKey } from '../types';

const CHIPS: { key: FilterKey; label: string; color: string }[] = [
  { key: 'sat',     label: '🙏 Sattvic',     color: '#9B5CE8' },
  { key: 'kids',    label: '👦 Kids',         color: '#0097A7' },
  { key: 'seas',    label: '🌍 All Seasons',  color: '#555' },
  { key: 'quick',   label: '⚡ Quick',        color: '#E67E22' },
  { key: 'easy',    label: '👌 Easy',         color: '#2980B9' },
  { key: 'oilFree', label: '💧 Oil-Free',     color: '#C0392B' },
];

export default function FilterBar() {
  const { filters, toggleFilter } = useStore();

  return (
    <div className="flex gap-2 px-4 py-2.5 overflow-x-auto hide-scrollbar sticky z-40"
      style={{ top: '64px', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>
      {CHIPS.map(({ key, label, color }) => {
        const on = filters[key];
        return (
          <button key={key} onClick={() => toggleFilter(key)}
            className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full transition-all active:scale-95"
            style={on
              ? { background: color, color: '#fff', border: `1.5px solid ${color}`, boxShadow: `0 2px 12px ${color}55` }
              : { background: 'var(--surface2)', color: 'var(--sub)', border: '1.5px solid var(--border)' }
            }>
            {label}
          </button>
        );
      })}
    </div>
  );
}
