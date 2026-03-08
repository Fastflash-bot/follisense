import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import HomePage from "./pages/HomePage";
import MidCycleCheckIn from "./pages/MidCycleCheckIn";
import WashDayAssessment from "./pages/WashDayAssessment";
import RiskOutput from "./pages/RiskOutput";
import ClinicianSummary from "./pages/ClinicianSummary";
import HistoryPage from "./pages/HistoryPage";
import LearnPage from "./pages/LearnPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/mid-cycle" element={<MidCycleCheckIn />} />
              <Route path="/wash-day" element={<WashDayAssessment />} />
              <Route path="/results" element={<RiskOutput />} />
              <Route path="/clinician-summary" element={<ClinicianSummary />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
