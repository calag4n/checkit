import React from 'react'
import styled from 'styled-components'

const Title = () => {
  return (
    <StyledTitle>Check it !</StyledTitle>
  )
}

export default Title

const StyledTitle = styled.h1`
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;

`