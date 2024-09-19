import './App.css';
import Navbar from './components/shared/Navbar';
import { useContext, useEffect, useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom'

import { AllConjugate } from './pages/AllConjugate';
import { PracticeConjugate } from './pages/PracticeConjugate';
import { About } from './pages/About';
import { VocabulairePage } from './pages/Vocabulaire';
import { VocabulaireTest } from './components/vocabulaire/VocabulaireTest';
import { VocabulaireSummary } from './components/vocabulaire/VocabulaireSummary';
import { SearchBar } from './components/shared/SearchBar';
import { ThemeContext, ThemeProvider, getThemeSession } from './context/context';
import { ErrorPage } from './components/shared/404';
import { Warning } from './pages/Warning';
import { HighlightPage } from './components/vocabulaire/Highlight';
import { Features } from './pages/Features';

function LanguageWindow() {
  let [chooseEnglish, setChooseEnglish] = useState(true);
  const { setEng } = useContext(ThemeContext);

  const onClickButton = (bool) => (e) => {
    setChooseEnglish(bool);
  }

  const onClickConfirm = (e) => {
    setEng(chooseEnglish);
    window.localStorage.setItem("FRENCH_APP_LANGUAGE", chooseEnglish)
  }

  return (<>
    <dialog id="language_window" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Bienvenu !</h3>
        <p className="py-4">Choose your Language 选择你的语言</p>

        <div className=''>
          <button className={chooseEnglish ? "btn btn-warning" : "btn btn-outline btn-warning"} onClick={onClickButton(true)}>English</button>
          <button className={!chooseEnglish ? "btn btn-warning ml-4" : "btn btn-outline btn-warning ml-4"} onClick={onClickButton(false)}>中文</button>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClickConfirm}>Confirm / 确定</button>
          </form>
        </div>
      </div>
    </dialog>
  </>)
}


function App() {

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', getThemeSession());
  }, [])

  useEffect(() => {
    if (!window.localStorage.getItem("FRENCH_APP_LANGUAGE")) {
      document.getElementById('language_window').showModal()
    }
  })

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
                <Route path='/features' element={<Features />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>

              <LanguageWindow />

            </main>
          </div>
        </HashRouter>
      </ThemeProvider>

    </>
  )
}

export default App;