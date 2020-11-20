import React from 'react'
import { RiDragMoveFill } from "react-icons/ri"
import styled from 'styled-components'


const Options = ({handleDragNDrop, isDraggable}) => {
  return (
    <Wrapper>
      <DragIcon onClick={handleDragNDrop} isDraggable={isDraggable}/>
    </Wrapper>
  )
}

export default Options

const Wrapper = styled.div`
  font-size: 2em;
  margin-bottom: 0.5em;
  line-height: 2.4em;
  
  & > * {
    border: 1px solid grey ;
    border-radius: 3px;
    background-color: white;
    box-shadow: 1px 1px 1px black;
  }
`;

const DragIcon = styled(RiDragMoveFill)`
  cursor: pointer;
  ${props=>props.isDraggable && 'color: red;'}
  ${props=>props.isDraggable && 'transform: scale(1.5);'}
`;