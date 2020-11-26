import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"
import { FaRegPlusSquare } from "react-icons/fa"

import LogoutIcon from "../images/Logout.js"
import ListIcon from "../images/ListIcon.js"
import SettingsIcon from "../images/SettingsIcon"

import { useFirebase } from "../contexts/firebaseContext"
import { useCheckers } from "../contexts/checkerContext.js"
import { CgReorder } from "react-icons/cg"

const Header = ({ page }) => {
  const { logout } = useFirebase()
  const { setCurrentChecker, isDraggable, setIsDraggable } = useCheckers()

  const handleGoList = () => {
    setCurrentChecker({ action: "close" })
    page !== "home" && navigate("/home")
  }

  return (
    <Navbar>
      {page === "checker" ? (
        <SortIcon
          active={isDraggable}
          onClick={() => setIsDraggable(prev => !prev)}
        >
          <CgReorder />
        </SortIcon>
      ) : (
        <LogoutIcon onClick={logout} />
      )}

      <ListIcon active={page === "home"} onClick={handleGoList} />

      {page === "home" ? (
        <PlusIcon
          onClick={() => navigate("/new", { state: { uuid: uuidv4() } })}
        >
          <FaRegPlusSquare />
        </PlusIcon>
      ) : (
        <SettingsIcon
          active={page === "settings"}
          onClick={() => page !== "settings" && navigate("/settings")}
        />
      )}
    </Navbar>
  )
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
}

export default Header

const SortIcon = styled.a`
  height: 20px;
  width: 20px;
  font-size: 1.5em;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : "inherited"};
`

const Navbar = styled.header`
  position: fixed;
  bottom: 0;
  color: ${props => props.theme.colors.grey};
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  box-shadow: 0px -5px 54px 3px rgba(0, 0, 0, 0.16);
  z-index: 20;

  background-color: white;

  & .active {
    color: ${props => props.theme.colors.primary};
  }
`
const PlusIcon = styled.a`
  cursor: pointer;
  display: flex;
  transition: color 200ms;
  &:hover {
    color: ${props => props.theme.colors.greyDark};
  }

  & svg {
    height: 25px;
    width: 25px;
  }
`
