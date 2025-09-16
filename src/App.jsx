import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/components/AuthProvider";

// Core components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

// Pages with lazy loading for better performance
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Register = lazy(() => import("@/pages/Register"));
const Schedule = lazy(() => import("@/pages/Schedule"));
const Workshops = lazy(() => import("@/pages/Workshops"));
const Speakers = lazy(() => import("@/pages/Speakers"));
const Hackathon = lazy(() => import("@/pages/Hackathon"));
const Materials = lazy(() => import("@/pages/Materials"));
const Sponsors = lazy(() => import("@/pages/Sponsors"));
const Organizers = lazy(() => import("@/pages/Organizers"));
const CodeOfConduct = lazy(() => import("@/pages/CodeOfConduct"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="qiskit-fest-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <AnimatePresence mode="wait">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/workshops" element={<Workshops />} />
                      <Route path="/speakers" element={<Speakers />} />
                      <Route path="/hackathon" element={<Hackathon />} />
                      <Route path="/materials" element={<Materials />} />
                      <Route path="/sponsors" element={<Sponsors />} />
                      <Route path="/organizers" element={<Organizers />} />
                      <Route
                        path="/code-of-conduct"
                        element={<CodeOfConduct />}
                      />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/event/:eventId" element={<EventDetail />} />
                      <Route path="/login" element={<Login />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
