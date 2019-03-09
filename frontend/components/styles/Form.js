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
  border: 0.25em solid ${props => props.theme.offWhite};
  padding: 1.5em;
  line-height: 1.5;
  label,
  .description {
    display: block;
    margin-bottom: 1em;
    font-size: 1.5em;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5em;
    font-size: 0.67em;
    border: 1px solid ${props => props.theme.black};
    font-family: inherit;
    resize: vertical;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.primaryColor};
    }
  }
  textarea {
    min-height: 8em;
  }
  fieldset {
    border: 0;
    padding: 0;
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
