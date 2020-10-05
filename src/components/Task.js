import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { RiDeleteBack2Line } from "react-icons/ri";

const Task = ({ uid, index, task = "", checked , updateChecker, deleteTask }) => {

  const handleChange = event => {
		let changes 
		if (event.target.name === `tasks[${index}]`) {
			changes = event.target.value
			updateChecker(index, changes, checked)
		} else {
			changes = event.target.checked
			updateChecker(index, task, changes)
		}
  }
  
  return (
    <Wrapper>
      <Checkbox
        type="checkbox"
        id={`checkbox-${uid}`}
        defaultChecked={checked}
        onChange={e=> handleChange(e)}
      />
      <Label htmlFor={`checkbox-${uid}`} aria-describedby="label" />
      <Input
        type="text"
        name={`tasks[${index}]`}
        id={`input-${uid}`}
        defaultValue={task}
        onChange={e=> handleChange(e)}
      />

      <DeleteIcon onClick={()=>deleteTask(index)}>
      <RiDeleteBack2Line/>
      </DeleteIcon>
    </Wrapper>
  )
}

Task.propTypes = {
  uid: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  task: PropTypes.string,
	checked: PropTypes.bool,
	updateChecker: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
}

export default Task

const Wrapper = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & [type="checkbox"]:checked ~ input[type="text"] {
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

const Label = styled.label`
  position: relative;
  padding-left: 2.3em;
  font-size: 1.5em;
  line-height: 1.7;
  cursor: pointer;
`

const Input = styled.input`
  &[type="text"] {
    transition: all 245ms;
    border: 3px solid ${props => props.theme.colors.primary};
  }
`

const DeleteIcon = styled.a`     
    cursor: pointer;
    transition: background-color 200ms;

    & svg {
      position: relative;
      top: 14px;
      left: 1px;
      color: ${props => props.theme.colors.danger};
      height: 20px;
      width: 20px;
    }
`;
