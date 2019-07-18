import styled from 'styled-components'

const Banner = styled.div`
  background-color: ${props => props.theme.primaryColor};
  background-image: initial;
  background-position: center;
  background-size: cover;
  display: block;
  height: 10em;
  width: 100%;

  &::after {
    content: ' ';
    background-color: transparent;
    background-image: linear-gradient(
      transparent 67.5%,
      ${props => props.theme.white}
    );
    display: block;
    height: 10em;
  }

  &.small {
    height: 5em;
    &::after {
      height: 5em;
    }
  }

  &.large {
    height: 15em;
    &::after {
      height: 15em;
    }
  }
`

export default Banner
