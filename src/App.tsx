import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProgressProvider } from "./context/ProgressContext";
import { Calendar } from "./pages/Calendar";
import { DayDetail } from "./pages/DayDetail";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import { Home } from "./pages/Home";
import { ProgressPage } from "./pages/Progress";
import { Library } from "./pages/Library";
import { Workout } from "./pages/Workout";
import { TrainingProvider } from "./context/TrainingContext";
import { Training } from "./pages/Training";

export default function App() {
  return (
    <ProgressProvider>
      <TrainingProvider>
        <BrowserRouter
          basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}
        >
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="day/:dayId" element={<DayDetail />} />
              <Route path="exercise/:exerciseId" element={<ExerciseDetail />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="library" element={<Library />} />
              <Route path="workout/:dayId" element={<Workout />} />
              <Route path="training" element={<Training />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TrainingProvider>
    </ProgressProvider>
  );
}
