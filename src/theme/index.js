import { ThemeContext, createGlobalStyle } from "styled-components"
import { useContext } from "react"

export const theme = {
  colors: {
    primary: "#ff3e00",
    grey: "#747688",
    bg: "rgb(244, 245, 253)",
    greyDark: "#444444",
    danger: "#E65264",
    dangerAccent: "#e01029",
    green: "#93ffae",

    "grey-light": "#c8c8c8",
    blue: "#1DCDFC",
    rose: "#FFC6BD",
    "dark-blue": "#1c1e38",
    light: "#f4f5fd",
    "primary-light": "#f4f5fd",
    yellow: "#ffedbd",
    "primary-dark": "#172b49",
    "primary-grey": "#8b95a5",
    bg: "#f4f5fd",
    dark: "#172b49",
    accent: " #4AD7FC",
    boxBg: "#F5F6FA",
    boxFg: "#66A3FF",
  },
  container: {
    "container-width": "1060px",
    "container-large-width": "1160px",
    "container-search-result": "982px",
  },
  radius: {
    "radius-small": "4px",
    "radius-medium": "8px",
    "radius-big": "16px",
  },
  fonts: {
    title: "Aldrich",
  },
}

export function useAppTheme() {
  return useContext(ThemeContext)
}

export const GlobalStyle = createGlobalStyle`
html{
  /* overflow-x: hidden; */
}
  body{
    margin: 0;
    background: ${props => props.theme.colors.light};
    /* overflow-x: hidden; */
  }
  *{
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    outline:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
	  -webkit-tap-highlight-color: transparent;
  }
  button, input[type=submit]{
    background-color: white;
    padding: 0.4em 1em;
    border-radius: 6px;
    border: 2px solid ${props => props.theme.colors.primary};
    box-shadow: 3px 4px 8px 0px rgba(0, 0, 0, 0.5);
    margin: 1em;
    outline: none;
    transition: box-shadow 200ms;
    &:hover{
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
    }
  }

  input[type=text], input[type=date], select{
    border: none;
    padding: 0.6em 0.3em;
    background-color: white;
    border-radius: 6px;
  }

  h1{
    color: ${props => props.theme.colors.primary};
  }

`

const breakpoints = {
  startTablet: 700,
  startDesktop: 1100,
}

export const mq = {
  phone: `max-width: ${breakpoints.startTablet - 1}px`,
  tablet: `min-width: ${breakpoints.startTablet}px) and (max-width: ${
    breakpoints.startDesktop - 1
  }px`,
  desktop: `min-width : ${breakpoints.startDesktop}px`,
  uptoTablet: `max-width: ${breakpoints.startDesktop - 1}px`,
  fromTablet: `min-width: ${breakpoints.startTablet}px`,
}
