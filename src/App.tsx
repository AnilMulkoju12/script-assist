import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ResourceList from './pages/ResourceList';
import ResourceDetails from './pages/ResourceDetails';
import PrivateRoute from './routes/PrivateRoutes';
import { useAuthStore } from './store/auth/useAuthStore';

const App: React.FC = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/resources" element={<ResourceList />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/resources" replace />} />
    </Routes>
  );
};

export default App;
