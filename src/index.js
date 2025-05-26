import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppLayout from './layouts/main';
import { BrowserRouter, Route, Routes } from "react-router";
import Poc1 from './pages/poc-1';
import Poc2 from './pages/poc-2';
import Poc3 from './pages/poc-3';
import Poc4 from './pages/poc-4';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="poc1" element={<Poc1 />} />
      <Route path="poc2" element={<Poc2 />} />
      <Route path="poc3" element={<Poc3 />} />
      <Route path="poc4" element={<Poc4/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
