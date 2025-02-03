import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import Mytrip from "./My-trip";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip/>
  },
  {
    path: "/my-trip",
    element: <Mytrip />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_G00GLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={Router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
