import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/context';
import { RiTranslate } from "react-icons/ri";
import { CgDarkMode } from "react-icons/cg";



function Navbar() {
  const { eng, setEng, changeLan, setTheme } = useContext(ThemeContext);

  let isMobile = window.innerWidth < 500;
  // if (isMobile) {
  //   document.getElementById('my_modal_1').showModal();
  // }
  let button_style = isMobile ? 'btn btn-ghost btn-sm rounded-btn text-base mx-0 px-2' : 'btn btn-ghost btn-sm rounded-btn text-lg';

  let [dark, setDark] = useState(true);
  const onClickStyleButton = (e) => {
    if (dark) {
      document.querySelector('html').setAttribute('data-theme', 'pastel');
      setTheme('pastel');
      window.localStorage.setItem('FRENCH_APP_THEME', 'pastel');
    }
    else {
      document.querySelector('html').setAttribute('data-theme', 'dark');
      setTheme('dark');
      window.localStorage.setItem('FRENCH_APP_THEME', 'dark');
    }
    setDark(!dark);
  }

  return (
    <>
      <nav role="navigation" className='navbar mb-12 shadow-lg bg-neutral text-neutral-content top-0 z-50 fixed'>
        <div className='container mx-auto'>

          <div className='flex-1 px-0 mx-0'>

            <div className='flex justify-between'>
              <div className>
                <Link className={button_style} to='/about'>
                  {eng ? "About" : "关于本站"}
                </Link>

                <Link className={isMobile ? 'btn btn-ghost btn-sm rounded-btn text-base mx-0 px-0' : 'btn btn-ghost btn-sm rounded-btn text-lg'} onClick={() => changeLan()}>
                  {isMobile ? <span className='opacity-0 m-0'>i</span> : (eng ? "Switch Language" : "换语言")}
                  <RiTranslate />
                </Link>

                <Link className={isMobile ? 'btn btn-ghost btn-sm rounded-btn text-base mx-0 px-1' : 'btn btn-ghost btn-sm rounded-btn text-lg'} onClick={onClickStyleButton}>
                  {isMobile ? <span className='opacity-0 m-0'>i</span> : (eng ? "Switch Theme" : "换主题")}
                  <CgDarkMode />
                </Link>
              </div>

              <div>

                <Link className={button_style} to='/'>
                  {eng ? "Home" : "主页"}
                </Link>

                <Link className={button_style} to='/practice'>
                  {eng ? (isMobile ? "Conj" : "Conjugations") : "变位"}
                </Link>

                <Link className={button_style} to='/voc'>
                  {eng ? (isMobile ? "Voc" : "Vocabularies") : "词汇"}
                </Link>

              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

Navbar.defaultProps = {
  title: 'Conjugate',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar