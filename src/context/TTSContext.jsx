import { createContext, useContext, useState, useEffect } from 'react';

const TTSContext = createContext();

export function TTSProvider({ children }) {
  // Selalu reset pilihan di awal (agar modal selalu muncul saat di-refresh)
  // Cocok untuk keperluan Demo Presentasi Lomba
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle TTS mode using Alt + S
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        setIsTTSEnabled((prev) => {
          const newState = !prev;
          localStorage.setItem('tts_enabled', newState ? 'true' : 'false');
          setHasMadeChoice(true);
          
          // Cannot use forceSpeak directly if it's not defined or we can just call window.speechSynthesis
          if (newState) {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance("Suara panduan diaktifkan.");
              utterance.lang = 'id-ID';
              window.speechSynthesis.speak(utterance);
            }
          } else {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance("Suara panduan dimatikan.");
              utterance.lang = 'id-ID';
              window.speechSynthesis.speak(utterance);
            }
          }
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const enableTTS = () => {
    localStorage.setItem('tts_enabled', 'true');
    setIsTTSEnabled(true);
    setHasMadeChoice(true);
    
    forceSpeak("Suara berhasil diaktifkan. Selamat datang di Space Difabel.");
  };

  const disableTTS = () => {
    localStorage.setItem('tts_enabled', 'false');
    setIsTTSEnabled(false);
    setHasMadeChoice(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const forceSpeak = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };


  const speak = (text) => {
    if (isTTSEnabled) {
      forceSpeak(text);
    }
  };

 
  const withTTS = (text) => {
    return {
      onMouseEnter: () => speak(text),
      onFocus: () => speak(text),
    };
  };

  return (
    <TTSContext.Provider value={{ isTTSEnabled, hasMadeChoice, enableTTS, disableTTS, speak, withTTS, forceSpeak }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  return useContext(TTSContext);
}
