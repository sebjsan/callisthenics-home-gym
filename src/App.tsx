import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProgressProvider } from './context/ProgressContext';
import { Calendar } from './pages/Calendar';
import { DayDetail } from './pages/DayDetail';
import { ExerciseDetail } from './pages/ExerciseDetail';
import { Home } from './pages/Home';
import { ProgressPage } from './pages/Progress';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="day/:dayId" element={<DayDetail />} />
            <Route path="exercise/:exerciseId" element={<ExerciseDetail />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
