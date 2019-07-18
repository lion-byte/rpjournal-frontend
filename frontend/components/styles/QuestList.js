import styled from 'styled-components'

const QuestList = styled.div`
  background-color: ${props => props.theme.white};
  border: 0.25em solid ${props => props.theme.offWhite};
  border-top-width: 0.125em;
  border-bottom-width: 0.125em;

  .quest {
    border: 0 solid ${props => props.theme.offWhite};
    border-top-width: 0.125em;
    border-bottom-width: 0.125em;
    color: ${props => props.theme.black};
    padding: 1em;
  }
`

export default QuestList
