import "@fontsource-variable/plus-jakarta-sans";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 500,
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
});
