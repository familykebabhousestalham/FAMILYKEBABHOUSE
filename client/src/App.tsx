import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobalVoiceControl from "@/components/global-voice-control";
import BasketDrawer from "@/components/basket-drawer";
import ChefsRecommendationPopup from "@/components/chefs-recommendation-popup";
import ReligiousCelebrationBanner from "@/components/religious-celebration-banner";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { BasketProvider } from "@/hooks/use-basket";

// Import critical pages directly
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import LoadingSkeleton from "@/components/loading-skeleton";

// Lazy load non-critical pages for bundle optimization
import { lazy, Suspense } from "react";
const Menu = lazy(() => import("@/pages/menu"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const NutritionalInfo = lazy(() => import("@/pages/nutritional-info"));
const MealBuilderPage = lazy(() => import("@/pages/meal-builder-page"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAIRecommendationsClick = () => {
    // If not on home page, navigate to home first using React Router
    if (location.pathname !== '/') {
      navigate('/');
      // Set a timeout to scroll after navigation
      setTimeout(() => {
        const aiSection = document.getElementById('ai-recommendations');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // If on home page, scroll to AI recommendations
      const aiSection = document.getElementById('ai-recommendations');
      if (aiSection) {
        aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BasketProvider>
          <div className="min-h-screen flex flex-col">
            <ReligiousCelebrationBanner />
            <Header onAIRecommendationsClick={handleAIRecommendationsClick} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/menu" 
                  element={
                    <Suspense fallback={<LoadingSkeleton />}>
                      <Menu />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <Suspense fallback={<LoadingSkeleton />}>
                      <About />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <Suspense fallback={<LoadingSkeleton />}>
                      <Contact />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/nutritional-info" 
                  element={
                    <Suspense fallback={<LoadingSkeleton />}>
                      <NutritionalInfo />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/meal-builder" 
                  element={
                    <Suspense fallback={<LoadingSkeleton />}>
                      <MealBuilderPage />
                    </Suspense>
                  } 
                />
                {/* Catch-all route for any unmatched paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <BasketDrawer />
          <ChefsRecommendationPopup />
          <GlobalVoiceControl />
          <PWAInstallPrompt />
          <Toaster />
        </BasketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

