import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const Identifier = () => <div>Identifier</div>;
const IdentifierLatest = () => <div>Identifier Latest</div>;
const IdentifierVersions = () => <div>Identifier Versions</div>;
const IdentifierVersion = () => <div>Identifier Version</div>;


/**
 * / -> Home
 * /:identifier -> extension page
 * /:identifier/latest -> extension page
 * /:identifier/:version -> extension page with specific version
 * /:identifier/versions -> all versions of a extension
 */

function App() {
  // Fallback should be changed to a loading component
  return (
    <Suspense fallback={null}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:identifier" element={<Identifier />} />
        <Route path=":identifier" element={<Identifier />}>
          <Route path="latest" element={<IdentifierLatest />} />
          <Route path="versions" element={<IdentifierVersions />} />
          <Route path=":version" element={<IdentifierVersion />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
