import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./scss/base.scss";

const PopupPage = lazy(() => import("./pages/Popup"));
const SideBarPage = lazy(() => import("./pages/SideBar"));
const AnalyticPage = lazy(() => import("./pages/Analytic"));

const router = createHashRouter([
  {
    path: "/popup",
    element: <PopupPage />,
  },
  {
    path: "/sidebar",
    element: <SideBarPage />,
  },
  {
    path: "/analytic-page",
    element: <AnalyticPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
