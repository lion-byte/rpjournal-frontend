import React from 'react'
import Link from 'next/link'

import { useUser } from './hooks/useUser'
import StyledHeader from './styles/Header'
import Logout from './Logout'
import Nav from './Nav'

export function Header () {
  const { loading, error, data } = useUser()

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
              {loading || error || !data.me ? (
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              ) : (
                <Logout />
              )}
            </li>
          </ul>
        </Nav>
      </div>
    </StyledHeader>
  )
}

export default Header
