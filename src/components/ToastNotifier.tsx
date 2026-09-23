import React, { useState, useEffect } from 'react';

export default function ToastNotifier() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    const handleToast = (e: any) => {
      if (e.detail?.message) {
        setToastMsg(e.detail.message);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setToastMsg(null);
        }, 3200);
      }
    };

    window.addEventListener('show-toast', handleToast);
    return () => {
      window.removeEventListener('show-toast', handleToast);
      clearTimeout(timer);
    };
  }, []);

  if (!toastMsg) return null;

  return (
    <div className="cine-toast show">
      {toastMsg}
    </div>
  );
}
