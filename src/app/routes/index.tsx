import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "../pages";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/first-page" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/first-page" />} />
      </Routes>
    </BrowserRouter>
  )
};
