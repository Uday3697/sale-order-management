import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ThemeToggle from "./components/ThemeToggle";
import { Box } from "@chakra-ui/react";
import ActiveSalesorder from "./pages/ActiveSalesorder";
import ComplitedSAlesOrder from "./pages/ComplitedSAlesOrder";

function App() {
  return (
    <BrowserRouter>
      <Box p={4}>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/active-sales" element={<ActiveSalesorder />} />
            <Route path="/completed-sales" element={<ComplitedSAlesOrder />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
