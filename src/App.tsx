import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkerLoginPage } from './pages/worker-portal/WorkerLoginPage';
import { WorkerPortalPage } from './pages/worker-portal/WorkerPortalPage';
import { WorkerRegister } from './pages/WorkerRegister';
import { BookingConfirmationUI } from './pages/BookingConfirmationUI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route - Worker Portal Login */}
        <Route path="/" element={<WorkerLoginPage />} />
        <Route path="/worker-login" element={<WorkerLoginPage />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        
        {/* Main Worker Portal Page */}
        <Route path="/worker-portal" element={<WorkerPortalPage />} />
        <Route path="/worker" element={<WorkerPortalPage />} />
        <Route path="/worker/*" element={<WorkerPortalPage />} />
        
        <Route path="/booking-confirmation" element={<BookingConfirmationUI />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;