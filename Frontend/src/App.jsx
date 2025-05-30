import React from 'react'
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage'
import ProductsPage from './pages/ProductsPage';
import EditProductModal from './pages/EditProductModal';
function App() {
  return (
  
    <>
    
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/create' element={<CreatePage />}></Route>
      <Route path='/products' element={<ProductsPage />}></Route>
      <Route path='/edit' element={<EditProductModal />}></Route>
    </Routes>

    </>
  )
}

export default App