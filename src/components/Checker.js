import React, { useState } from "react"
import styled from "styled-components"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import PropTypes from "prop-types"
import { FaTrashAlt } from "react-icons/fa"

import Task from "./Task"
import Options from "./Options"
import { useCheckers } from "../contexts/checkerContext"

const Checker = () => {
  const { currentChecker, setCurrentChecker, isDraggable } = useCheckers()

  const getPeriodInFrench = () => {
    const period = currentChecker?.period
    return period === "daily"
      ? "Quotidient"
      : period === "monthly"
      ? "Mensuelle"
      : "Hebdomadaire"
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <H1 color={currentChecker?.color}>{currentChecker?.title}</H1>

        <h2>Périodicité: {getPeriodInFrench()}</h2>
        <Close onClick={() => setCurrentChecker({ action: "close" })}>×</Close>

        {/* <Options handleDragNDrop={handleDragNDrop} isDraggable={isDraggable} /> */}
      </TitleWrapper>

      <Content>
        <DragDropContext
          onDragEnd={dragInfos =>
            setCurrentChecker({ action: "updateTasksOrder", value: dragInfos })
          }
        >
          <Droppable droppableId={"droppable"}>
            {provided => (
              <Ul ref={provided.innerRef} {...provided.droppableProps}>
                {currentChecker?.tasks.map(({ task, checked }, index) => (
                  <Task
                    key={`taskKey-${index}`}
                    uid={`${currentChecker?.id}-${task}-${index}`}
                    index={index}
                    task={task}
                    checked={checked}
                    // draggableId={`taskKey-${index}`}
                  />
                ))}
                {provided.placeholder}
              </Ul>
            )}
          </Droppable>
        </DragDropContext>

        <Button
          onClick={() => setCurrentChecker({ action: "addTask" })}
          color={currentChecker?.color}
        >
          +
        </Button>

        <TrashIcon
          onClick={() =>
            setCurrentChecker({
              action: "removeChecker",
              value: currentChecker?.id,
            })
          }
        >
          <FaTrashAlt />
        </TrashIcon>
      </Content>
    </Wrapper>
  )
}

export default Checker

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1400px;
  min-width: 50%;
  margin: auto;
`

const H1 = styled.h1`
  color: ${props => props.color};
`

const Close = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2.6em;
  padding: 0.1em 0.25em 0.25em 0.25em;
  border-radius: 6px;
  transition: all 200ms;
  z-index: 21;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.danger};
    color: white;
  }
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
  padding: 1.25rem;
  padding-bottom: 8vh;
`

const Ul = styled.div``

const TrashIcon = styled.a`
  position: fixed;
  bottom: 7px;
  cursor: pointer;
  display: flex;
  transition: background-color 200ms;
  background-color: ${props => props.theme.colors.danger};
  border-radius: 50%;
  width: 37px;
  height: 37px;
  z-index: 21;
  &:hover {
    background-color: ${props => props.theme.colors.dangerAccent};
  }

  & svg {
    position: relative;
    top: 8px;
    left: 8px;
    color: white;
    height: 20px;
    width: 20px;
  }
`
const Button = styled.button`
  border-color: ${props => props.color};
`

const TitleWrapper = styled.div`
  padding: 1.5em;
`
