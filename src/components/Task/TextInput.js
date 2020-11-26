import React, { useState } from "react"
import styled from "styled-components"
import { CgRemoveR } from "react-icons/cg"
import { useCheckers } from "../../contexts/checkerContext"

const TextInput = ({ index, ...props }) => {
  const { setCurrentChecker, isDraggable } = useCheckers()

  const handleDelete = event => {
    event.stopPropagation()
    setCurrentChecker({ action: "deleteTask", value: index })
  }

  return (
    <Label className={`textInput ${isDraggable ? "isDraggable" : ""}`}>
      <Input {...props} />

      <DeleteIcon onClick={handleDelete}>
        <CgRemoveR />
      </DeleteIcon>
    </Label>
  )
}

export default TextInput

const DeleteIcon = styled.a`
  cursor: pointer;
  transition: all 400ms;
  position: absolute;
  top: calc(50% - 10px);
  right: 10px;

  opacity: 0;
  pointer-events: none;

  & svg {
    position: relative;
    color: ${props => props.theme.colors.danger};
    height: 20px;
    width: 20px;
  }
`

const Label = styled.label`
  display: block;
  transition: all 245ms;
  border: 3px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  width: 100%;
  position: relative;
  z-index: 20;

  &.isDraggable {
    width: 85%;

    & > a {
      opacity: 1;
      pointer-events: all;
    }
  }
`

const Input = styled.input`
  border: none;
  width: 100%;
`
