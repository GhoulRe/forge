import { useState, useEffect, useCallback, useRef } from 'react';

// Reusable hook for full-screen focus mode on code editors and notes.
// Supports both native Fullscreen API (with graceful fallback) and fixed full-viewport focus overlay.
export function useFullscreen() {
  const [fs, setFs] = useState(false);
  const ref = useRef(null);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setFs(false);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
  }, []);

  const enter = useCallback(() => {
    setFs(true);
    const el = ref.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
    setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
  }, []);

  const toggle = useCallback(() => {
    if (fs || document.fullscreenElement) {
      exit();
    } else {
      enter();
    }
  }, [fs, enter, exit]);

  useEffect(() => {
    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      if (!isFs && fs) {
        setFs(false);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
      }
    };
    const onKey = e => {
      if (e.key === 'Escape' && fs) {
        exit();
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      window.removeEventListener('keydown', onKey);
    };
  }, [fs, exit]);

  useEffect(() => {
    return () => {
      if (document.fullscreenElement && ref.current && document.fullscreenElement === ref.current) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  return { fs, toggle, enter, exit, ref };
}
