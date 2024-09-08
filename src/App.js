import './App.css';
import Navbar from './components/shared/Navbar';
import { useEffect } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom'

import { AllConjugate } from './pages/AllConjugate';
import { PracticeConjugate } from './pages/PracticeConjugate';
import { About } from './pages/About';
import { VocabulairePage } from './pages/Vocabulaire';
import { VocabulaireTest } from './components/vocabulaire/VocabulaireTest';
import { VocabulaireSummary } from './components/vocabulaire/VocabulaireSummary';
import { SearchBar } from './components/shared/SearchBar';
import { ThemeProvider, getThemeSession } from './context/context';
import { ErrorPage } from './components/shared/404';
import { Warning } from './pages/Warning';
import { HighlightPage } from './components/vocabulaire/Highlight';

function App() {

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', getThemeSession());
  }, [])

  return (
    <>
      <ThemeProvider>
        <HashRouter>
          <div className='flex flex-col justify h-screen'>
            <Navbar /><br /><br /><br />

            <main className='container mx-auto px-3 pb-12'>
              <Routes>
                {/* <Route exact path='/:scroll?' element={<AllConjugate />} /> */}
                <Route exact path='/?' element={<AllConjugate />} />
                <Route path='/practice' element={<PracticeConjugate />} />
                <Route path='/about' element={<About />} />
                <Route path='/voc' element={<VocabulairePage />} />
                <Route path='/vocunit/:id?/:gender?' element={<VocabulaireTest />} />
                <Route path='/vocsum/:id' element={<VocabulaireSummary />} />
                <Route path='/search' element={<SearchBar />} />
                <Route path='/error' element={<ErrorPage />} />
                <Route path='/warning' element={<Warning />} />
                <Route path='/highlight' element={<HighlightPage />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>

            </main>
          </div>
        </HashRouter>
      </ThemeProvider>

    </>
  )
}

export default App;