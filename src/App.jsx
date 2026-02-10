import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlaceManager from './pages/Places';
import BudgetManager from './pages/Budget';
import { TripProvider } from './store/TripContext';

function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="places" element={<PlaceManager />} />
            <Route path="budget" element={<BudgetManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;
