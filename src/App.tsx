
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn/ui sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import IndexPage from "./pages/Index";
import ExcuseGeneratorPage from "./pages/ExcuseGeneratorPage";
import AlibiBuilderPage from "./pages/AlibiBuilderPage";
import ExcuseVaultPage from "./pages/ExcuseVaultPage";
import LieDetectorPage from "./pages/LieDetectorPage";
import NotFoundPage from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/generate-excuse" element={<ExcuseGeneratorPage />} />
            <Route path="/alibi-builder" element={<AlibiBuilderPage />} />
            <Route path="/excuse-vault" element={<ExcuseVaultPage />} />
            <Route path="/lie-detector" element={<LieDetectorPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
