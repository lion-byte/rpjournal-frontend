import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`

const Form = styled.form`
  textarea {
    min-height: 8em;
  }
  fieldset {
    border: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 1.5s linear infinite;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        ${props => props.theme.white} 0%,
        ${props => props.theme.black} 50%,
        ${props => props.theme.white} 100%
      );
      transition: background 1s ease-in-out;
    }
  }
`

export default Form
