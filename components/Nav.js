import React, { useState } from 'react'

import StyledNav from './styles/Nav'

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function Nav (props) {
  const [isActive, setActive] = useState(false)

  const toggleMenu = () => setActive(!isActive)
  const hideMenu = () => setActive(false)

  return (
    <StyledNav>
      <button className='menu-button' onClick={toggleMenu}>
        <span>Menu</span>
      </button>

      <div
        className={isActive ? 'menu active' : 'menu'}
        onClickCapture={hideMenu}
      >
        {props.children}
      </div>
    </StyledNav>
  )
}

export default Nav
