import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout components
import Dashboard from "./pages/Dashboard";

// Auth and public pages
const LandingPage = lazy(() => import("./pages/LandinPage"));
const LoginPage = lazy(() => import("./pages/login"));

// Component pages - lazy loaded
const ComponentsOverview = lazy(() => import("./pages/components/ComponentsOverview"));
const ButtonsPage = lazy(() => import("./pages/components/ButtonsPage"));
// const CardsPage = lazy(() => import("./pages/components/CardsPage"));
// const FormsPage = lazy(() => import("./pages/components/FormsPage"));
// const TablesPage = lazy(() => import("./pages/components/TablesPage"));
// const ModalsPage = lazy(() => import("./pages/components/ModalsPage"));

// Document pages
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
// const Settings = lazy(() => import("./pages/dashboard/Settings"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<LoginPage />} />
          
          {/* Dashboard and components */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            
            {/* Components routes */}
            <Route path="components">
              <Route index element={<ComponentsOverview />} />
              <Route path="buttons" element={<ButtonsPage />} />
              {/* <Route path="cards" element={<CardsPage />} />
              <Route path="forms" element={<FormsPage />} />
              <Route path="tables" element={<TablesPage />} />
              <Route path="modals" element={<ModalsPage />} /> */}
            </Route>
            
            {/* Saved components routes */}
            {/* <Route path="saved-components">
              <Route index element={<Navigate to="/dashboard/saved-components/recent" replace />} />
              <Route path="project-a" element={<div>Project A Saved Components</div>} />
              <Route path="project-b" element={<div>Project B Saved Components</div>} />
              <Route path="recent" element={<div>Recent Saved Components</div>} />
            </Route> */}
            
            {/* Documents routes */}
            {/* <Route path="documents">
              <Route index element={<Navigate to="/dashboard/documents/tutorials" replace />} />
              <Route path="tutorials" element={<div>Tutorials</div>} />
              <Route path="api-docs" element={<div>API Documentation</div>} />
              <Route path="guidelines" element={<div>Guidelines</div>} />
            </Route> */}
            
            {/* Settings */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
          
          {/* 404 fallback */}
          <Route path="*" element={<div className="flex items-center justify-center h-screen bg-gray-900 text-white">Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;