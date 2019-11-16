import React from 'react'
import { storiesOf } from '@storybook/react'

import CreateQuest from '../components/CreateQuest'

storiesOf('Scratch', module)
  .add('Explanation', () => (
    <p>This is just to flesh out any new components. Nothing here is final.</p>
  ))
  .add('Create Quest', () => <CreateQuest />)
