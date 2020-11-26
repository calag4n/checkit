import React from "react"
import { RiDragMoveFill } from "react-icons/ri"
import styled from "styled-components"

const Options = ({ handleDragNDrop, isDraggable }) => {
  return (
    <Wrapper>
      <RiDragMoveFill
        onClick={handleDragNDrop}
        className={`${isDraggable ? "option-icon-active" : ""}`}
      />
    </Wrapper>
  )
}

export default Options

const Wrapper = styled.div`
  font-size: 2em;
  line-height: 2.4em;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
  padding: 1em;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};

  & > * {
    border: 1px solid grey;
    border-radius: 3px;
    background-color: white;
    box-shadow: 1px 1px 1px black;
    cursor: pointer;

    &.option-icon-active {
      color: red;
      transform: scale(1.5);
    }
  }
`
