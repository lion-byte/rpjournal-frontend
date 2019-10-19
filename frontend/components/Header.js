import React, { useContext } from 'react'
import Link from 'next/link'

import StyledHeader from './styles/Header'
import Logout from './Logout'
import Nav from './Nav'
import { UserContext } from './UserProvider'

export function Header () {
  const user = useContext(UserContext)

  return (
    <StyledHeader>
      <div className='bar'>
        <h1>
          <Link href='/'>
            <a>RPJournal</a>
          </Link>
        </h1>
      </div>

      <div className='sub-bar'>
        <Nav>
          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              {user ? (
                <Logout />
              ) : (
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              )}
            </li>
          </ul>
        </Nav>
      </div>
    </StyledHeader>
  )
}

export default Header
