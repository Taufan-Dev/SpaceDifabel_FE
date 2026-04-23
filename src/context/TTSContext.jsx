import { createContext, useContext, useState, useEffect } from 'react';

const TTSContext = createContext();

export function TTSProvider({ children }) {
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);

  useEffect(() => {
    // Cek apakah user sebelumnya sudah pernah memilih
    const savedChoice = localStorage.getItem('tts_enabled');
    if (savedChoice !== null) {
      setHasMadeChoice(true);
      setIsTTSEnabled(savedChoice === 'true');
    }
  }, []);

  const enableTTS = () => {
    localStorage.setItem('tts_enabled', 'true');
    setIsTTSEnabled(true);
    setHasMadeChoice(true);
    
    // Test native voice to ensure permission
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

  // Fungsi internal yang benar-benar memanggil Web API
  const forceSpeak = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel(); // Matikan suara yang sedang jalan
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Force Indonesian voice
    utterance.rate = 0.9; // Agak lebih lambat pelafalannya agar lebih jelas
    window.speechSynthesis.speak(utterance);
  };

  // Fungsi aman yang dipakai komponen. Akan diam kalau user pilih MATI
  const speak = (text) => {
    if (isTTSEnabled) {
      forceSpeak(text);
    }
  };

  // Komponen Helper Hook (membantu bungkus onMouseEnter dan onFocus)
  // Cara pakainya: <div {...withTTS("Halo!")}>...</div>
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
