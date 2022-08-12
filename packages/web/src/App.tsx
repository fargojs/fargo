import { Suspense } from 'react';

import Header from './components/Header';
import WebRoutes from './components/WebRoutes';
import { useZoteraStore } from './stores/useZoteraStore';

function App() {
  // Fallback should be changed to a loading component
  const zotera = useZoteraStore();
  return (
    <Suspense fallback={null}>
      <Header />
      <div className="max-w-7xl w-full mx-auto h-[calc(100vh-65px)]">
        {JSON.stringify(zotera)}
        {JSON.stringify(import.meta.env)}
        <WebRoutes />
      </div>
    </Suspense>
  );
}

export default App;
