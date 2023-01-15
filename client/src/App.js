import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Transactions from "./components/Transactions";
import { UserContextProvider } from './auth.context';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Transactions />} path="/transactions" />
        <Route element={<Navigate to="/login" />} path="*" />
      </Routes>
    </UserContextProvider>
  )
}

export default App;