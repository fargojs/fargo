import { Suspense } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import WebRoutes from "./components/WebRoutes";
import { useZoteraStore } from "./stores/useZoteraStore";

export default function App() {
  const zotera = useZoteraStore();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <div className="max-w-7xl w-full mx-auto h-[calc(100vh-130px)]">
          <WebRoutes />
        </div>
        {zotera.options.footer && (
          <Footer
            message={zotera.options.footer!.message!}
            copyright={zotera.options.footer!.copyright!}
          />
        )}
      </div>
    </Suspense>
  );
}
