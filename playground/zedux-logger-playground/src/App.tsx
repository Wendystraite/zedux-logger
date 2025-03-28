import { AppContent } from './AppContent/AppContent';
import { ZeduxProvider } from './ZeduxProvider';

function App() {
  return (
    <ZeduxProvider>
      <AppContent />
    </ZeduxProvider>
  );
}

export default App;
