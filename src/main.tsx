import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Report from "./components/Report/Report.tsx";
import General from "./components/Report/Gen-report/Gen-report.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/general" element={<General />} />
      </Routes>
    </Router>
  </React.StrictMode>
);