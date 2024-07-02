import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SignUp from './components/Sign-Up/Signup.tsx'
import Login from './components/Login/Login.tsx'
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
