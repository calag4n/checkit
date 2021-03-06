import React, { useEffect, useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { MdDragHandle } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"
import { useCheckers } from "../../contexts/checkerContext"
import TextInput from "./TextInput"

const Task = ({ uid, index, task = "", checked }) => {
  const { setCurrentChecker, isDraggable } = useCheckers()
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = event => {
    let update
    if (event.target.name === `tasks[${index}]`) {
      update = event.target.value
      setCurrentChecker({
        action: "updateChecker",
        value: { index, task: update, checked },
      })
    } else {
      update = event.target.checked
      setCurrentChecker({
        action: "updateChecker",
        value: { index, task, checked: update },
      })
    }
  }

  useEffect(() => {
    const draggingEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mouseup", draggingEnd)
      document.addEventListener("touchend", draggingEnd)
    }

    return () => {
      document.removeEventListener("mouseup", draggingEnd)
      document.removeEventListener("touchend", draggingEnd)
    }
  }, [isDragging])

  const handleDragging = () => {
    setIsDragging(true)
  }

  return (
    <Draggable
      draggableId={`taskKey-${index}`}
      index={index}
      isDragDisabled={!isDraggable}
    >
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={isDragging}
        >
          <Checkbox
            type="checkbox"
            id={`checkbox-${uid}`}
            defaultChecked={checked}
            onChange={e => handleChange(e)}
          />
          <Label htmlFor={`checkbox-${uid}`} aria-describedby="label" />

          <TextInput
            type="text"
            name={`tasks[${index}]`}
            id={`input-${uid}`}
            value={task}
            index={index}
            onChange={e => handleChange(e)}
            onClick={() => console.log(provided)}
          />
          <DragBloc
            className={isDraggable ? "isDraggable" : ""}
            onMouseDown={handleDragging}
            onTouchStart={handleDragging}
          />
        </Wrapper>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  uid: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  task: PropTypes.string,
  checked: PropTypes.bool,
}

export default Task

const Wrapper = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 3em;
  position: relative;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};

  & [type="checkbox"]:checked ~ label.textInput {
    transition: all 245ms;
    border: 3px solid ${props => props.theme.colors.green};
  }

  & [type="checkbox"]:not(:checked) + label::before,
  & [type="checkbox"]:checked + label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 2em;
    height: 2em;
    border: 1px solid #aaa;
    background: #fff;
    border-radius: 0.2em;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 0 rgba(203, 34, 237, 0.2);
    transition: all 0.275s;
  }

  [type="checkbox"]:not(:checked) + label::after,
  [type="checkbox"]:checked + label::after {
    content: "✔️";
    position: absolute;
    top: 0.6em;
    left: 0.18em;
    font-size: 1.6em;
    color: ${props => props.theme.colors.green};
    line-height: 0;
    transition: all 0.2s;
  }

  [type="checkbox"]:not(:checked) + label::after {
    opacity: 0;
    transform: scale(0) rotate(70deg);
  }

  [type="checkbox"]:checked + label::after {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
`

const Checkbox = styled.input`
  position: absolute;
  left: 0;
  opacity: 0.01;
`

const DragBloc = styled(MdDragHandle)`
  font-size: 0.1em;
  width: 2em;
  height: 2em;
  position: relative;
  right: 0;
  z-index: 19;
  opacity: 0;
  transition: opacity 400ms;
  margin-left: 1em;

  &.isDraggable {
    opacity: 1;
    font-size: 1.5em;
  }
`

const Label = styled.label`
  position: relative;
  padding-left: 2.3em;
  font-size: 1.5em;
  line-height: 1.7;
  cursor: pointer;
`
