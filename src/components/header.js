import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import LogoutIcon from "../images/Logout.js"
import ListIcon from "../images/ListIcon.js"
import SettingsIcon from "../images/SettingsIcon"

const Header = () => (
  <Navbar>
    <SettingsIcon />
    <ListIcon active={true} />
    <LogoutIcon/>
  </Navbar>
)

export default Header

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

  & .active{
    color: ${props => props.theme.colors.primary};
  }
`
