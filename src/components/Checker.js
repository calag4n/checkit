import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaTrashAlt } from "react-icons/fa"

import Task from "./Task"

const Checker = ({
  checker,
  closeChecker,
  removeChecker,
  updateChecker,
  deleteTask,
  addTask,
}) => {
  const getPeriodInFrench = () => {
    const { period } = checker
    return period === "daily"
      ? "Quotidient"
      : period === "monthly"
      ? "Mensuelle"
      : "Hebdomadaire"
  }
  return (
    <Wrapper>
      <H1 color={checker.color}>{checker.title}</H1>

      <h2>Périodicité: {getPeriodInFrench()}</h2>
      <Close onClick={closeChecker}>×</Close>

      <Content>
        {checker.tasks.map(({ task, checked }, index) => (
          <Task
            key={`${checker.id}-${index}`}
            uid={`${checker.id}-${index}`}
            index={index}
            task={task}
            checked={checked}
            updateChecker={updateChecker}
            deleteTask={deleteTask}
          />
        ))}

        <Button onClick={addTask} color={checker.color}>+</Button>

        <TrashIcon onClick={() => removeChecker(checker.id)}>
          <FaTrashAlt />
        </TrashIcon>
      </Content>
    </Wrapper>
  )
}

Checker.propTypes = {
  checker: PropTypes.object.isRequired,
  closeChecker: PropTypes.func.isRequired,
  removeChecker: PropTypes.func.isRequired,
  updateChecker: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}

export default Checker

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const H1 = styled.h1`
  color: ${props => props.color};
`;

const Close = styled.a`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 2.6em;
  padding: 0.1em 0.25em 0.25em 0.25em;
  border-radius: 6px;
  transition: all 200ms;
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
  padding-bottom:8vh;
`

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
`;