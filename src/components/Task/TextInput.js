import React, { useState } from "react"
import styled from "styled-components"
import { CgRemoveR } from "react-icons/cg"
import { useCheckers } from "../../contexts/checkerContext"

const TextInput = ({ index, isDraggable, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { setCurrentChecker } = useCheckers()

  return (
    <Label className={`textInput ${isDraggable ? "isDraggable" : ""}`}>
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      <DeleteIcon
        onClick={() =>
          setCurrentChecker({ action: "deleteTask", value: index })
        }
      >
        <CgRemoveR />
      </DeleteIcon>
    </Label>
  )
}

export default TextInput

const DeleteIcon = styled.a`
  cursor: pointer;
  transition: background-color 200ms;
  position: absolute;
  top: calc(50% - 10px);
  right: 10px;

  & svg {
    position: relative;
    /* top: 14px;
    left: 1px; */
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

  &.isDraggable {
    width: 85%;
  }
`

const Input = styled.input`
  border: none;
  width: 100%;
`
