import React from 'react'
import Link from 'next/link'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import { fillerBackgroundImage } from '../lib/filler'

const StyledAdventure = styled.article`
  border: 0.125em solid ${props => props.theme.offWhite};
  border-radius: 0 0 1em 1em;
  word-wrap: break-word;

  figure {
    margin: 0;

    img {
      max-height: 5em;
      object-fit: cover;
      width: 100%;
    }
  }

  .info {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1em 0.5em;

    h1 {
      margin: 0;
      max-width: 20em;
    }

    time {
      text-align: right;
    }
  }
`

/**
 * @param {object} props
 * @param {AdventureModel} props.adventure
 */
const Adventure = props => {
  const { adventure } = props

  return (
    <StyledAdventure>
      <figure>
        <img src={fillerBackgroundImage()} alt={adventure.title} />
      </figure>

      <div className='info'>
        <h1>
          <Link href={{ pathname: '/adventure', query: { id: adventure.id } }}>
            <a>{adventure.title}</a>
          </Link>
        </h1>

        <TimeAgo date={adventure.updatedAt} />
      </div>
    </StyledAdventure>
  )
}

export default Adventure
