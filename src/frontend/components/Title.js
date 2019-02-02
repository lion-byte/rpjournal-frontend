import React from 'react'
import Head from 'next/head'

/**
 * @param {object} props
 * @param {string} props.title
 */
const Title = props => (
  <Head>
    <title>{props.title} | RPJournal</title>
  </Head>
)

export default Title
