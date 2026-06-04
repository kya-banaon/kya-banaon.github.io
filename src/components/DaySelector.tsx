import { useStore } from '../store';
import { DAY_NAMES, getDayDate } from '../mealLogic';

export default function DaySelector() {
  const { selectedDay, selectDay } = useStore();
  const today = new Date();

  return (
    <div className="flex gap-1 px-4 py-3 overflow-x-auto hide-scrollbar"
      style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>
      {DAY_NAMES.map((name, i) => {
        const dt = getDayDate(i);
        const isToday = dt.toDateString() === today.toDateString();
        const isActive = i === selectedDay;
        return (
          <button key={i} onClick={() => selectDay(i)}
            className="flex-shrink-0 flex flex-col items-center gap-1 min-w-[44px] py-1.5 rounded-2xl transition-all active:scale-95">
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: isActive ? 'var(--primary)' : 'var(--sub)' }}>
              {name}
            </span>
            <span className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all"
              style={isToday
                ? { background:'var(--primary)', color:'#fff', boxShadow:'0 3px 12px var(--primary-glow)' }
                : isActive
                  ? { background:'var(--primary-dim)', color:'var(--primary)' }
                  : { color:'var(--text)' }
              }>
              {dt.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
