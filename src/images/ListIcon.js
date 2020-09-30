import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const ListIcon = ({ active }) => {
  return (
    <Wrapper>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="list-ul"
        className={active ? "active" : ""}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="20"
      >
        <path
          fill="currentColor"
          d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
        ></path>
      </svg>
    </Wrapper>
  )
}

export default ListIcon

ListIcon.propTypes = {
  active: PropTypes.bool,
}

const Wrapper = styled.a`
  cursor: pointer;
  display: flex;
  transition: color 200ms;
  &:hover{
    color: ${props => props.theme.colors.greyDark};
  }
`