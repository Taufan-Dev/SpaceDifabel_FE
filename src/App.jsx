import AppRouter from './routes/AppRouter';
import { TTSProvider } from './context/TTSContext';

function App() {
  return (
    <TTSProvider>
      <AppRouter />
    </TTSProvider>
  );
}

export default App;
