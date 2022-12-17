import React from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = React.lazy(
  () => import("../components/login-component/login-page")
);
const ViewerServicePage = React.lazy(
  () => import("../components/viewer-service-component/viewer-service-page")
);
const FileServicePage = React.lazy(
  () => import("../components/file-service-component/file-service-page")
);

export const router = createBrowserRouter([
  {
    path: "main",
    children: [
      {
        path: "file/*",
        element: (
          <React.Suspense fallback={<>...</>}>
            <FileServicePage />
          </React.Suspense>
        ),
      },
      {
        path: "viewer/*",
        element: (
          <React.Suspense fallback={<>...</>}>
            <ViewerServicePage />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <React.Suspense fallback={<>...</>}>
            <LoginPage />
          </React.Suspense>
        ),
      },
    ],
  },
]);
