import './App.css'
import React from 'react';
import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import UploadPage from './components/UploadPage';

function App() {

  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/ProductPage/:id" element={<ProductPage />}></Route>
        <Route path="/UploadPage" element={<UploadPage />}></Route>
      </Routes>
    </div>
  )
}

export default App;
