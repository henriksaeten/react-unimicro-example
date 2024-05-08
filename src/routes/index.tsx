import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import PrivateRoute from "./privateroute";
import ChangeContacts from "../pages/changeContacts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }/>
    <Route path="/change" element={
        <PrivateRoute>
          <ChangeContacts />
        </PrivateRoute>
      }/>
    </Routes>
  );
};
export default AppRoutes;
