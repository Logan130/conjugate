import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useContext, useState } from 'react'


function Navbar({ title }) {

  return (
    <nav role="navigation" className='navbar mb-12 shadow-lg bg-neutral text-neutral-content top-0 z-10 fixed'>
      <div className='container mx-auto'>

        <div className='flex-1 px-2 mx-2'>
          <div className='flex justify-end'>

            <Link className='btn btn-ghost btn-sm rounded-btn text-lg' to='/'>
              动词变位表
            </Link>

            <Link className='btn btn-ghost btn-sm rounded-btn text-lg' to='/practice'>
              练习
            </Link>








          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Conjugate',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar