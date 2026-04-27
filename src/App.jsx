import AppRouter from './routes/AppRouter';
import { TTSProvider } from './context/TTSContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <TTSProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TTSProvider>
  );
}

export default App;
