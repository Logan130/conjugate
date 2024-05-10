import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AllConjugate } from './page/AllConjugate';
import { Practice } from './page/Practice';


function App() {

  return (
    <>
        <Router>
          <div className='flex flex-col justify-between h-screen dark'>
            <Navbar /><br/><br/><br/>

            <main className='container mx-auto px-3 pb-12'>
              <Routes>
                <Route path='/' element={<AllConjugate/>} />

                <Route path='/practice' element={<Practice/>} />
              </Routes>

            </main>
          </div>
        </Router>
    </>
  )
}

export default App;