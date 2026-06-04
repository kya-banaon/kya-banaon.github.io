import { useState, useEffect } from 'react';

let deferredPrompt: any = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export default function PwaBanner() {
  const [showInstall, setShowInstall] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    // Check if we can install
    const checkPrompt = () => {
      if (deferredPrompt) {
        setShowInstall(true);
      }
    };
    
    // Check initially and poll a few times just in case the event fired late
    checkPrompt();
    const interval = setInterval(checkPrompt, 1000);
    
    if (Notification.permission === 'granted') {
      setRemindersEnabled(true);
    }

    return () => clearInterval(interval);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
      deferredPrompt = null;
    }
  };

  const handleReminders = async () => {
    if (Notification.permission === 'granted') return;
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setRemindersEnabled(true);
    }
  };

  if (!showInstall && remindersEnabled) return null;

  return (
    <div className="mx-4 mt-4 mb-2 rounded-2xl p-4 sm:hidden flex flex-col gap-3"
      style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}>
      
      {showInstall && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--text)]">Install App</div>
            <div className="text-xs text-[var(--sub)]">Add to home screen for offline access</div>
          </div>
          <button onClick={handleInstall}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-white transition-transform active:scale-95"
            style={{ background: 'var(--primary)', boxShadow: '0 2px 8px var(--primary-glow)' }}>
            Install
          </button>
        </div>
      )}

      {showInstall && !remindersEnabled && <div className="w-full h-px" style={{ background: 'var(--border)' }} />}

      {!remindersEnabled && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--text)]">Enable Reminders</div>
            <div className="text-xs text-[var(--sub)]">Get notified for meals (8 AM, 12 PM, 7 PM)</div>
          </div>
          <button onClick={handleReminders}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-[var(--primary)] transition-transform active:scale-95"
            style={{ background: 'var(--primary-dim)', border: '1px solid var(--primary)' }}>
            Enable
          </button>
        </div>
      )}
    </div>
  );
}
