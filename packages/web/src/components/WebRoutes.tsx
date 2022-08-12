import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Identifier = lazy(() => import('../pages/Identifier'));
const Error = lazy(() => import('../pages/Error'));

export default function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:identifier" element={<Identifier />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
