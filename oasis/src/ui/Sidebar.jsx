import styled, {css} from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { useDarkMode } from "../DarkModeContext";


const theme = {
  dark: css`
    background-color:  #18212f;
    border-bottom: 1px solid  #1f2937;
  `,
  light: css`
     background-color: #fff;
    border-bottom: 1px solid #f3f4f6;
  `
}

const StyledSidebar = styled.aside`
    background-color: var(--color-gray-0);
    padding: 3.2rem 2.4rem;
    border-bottom: 1px solid var(--color-gray-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    /* --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937; */
  ${(props) => theme[props.theme]}
`

function Sidebar() {
  const { isDarkMode } = useDarkMode();

  return (
   <StyledSidebar theme={isDarkMode ? "dark": "light"} >
      <Logo/>
      <MainNav/>
      <Uploader />
   </StyledSidebar>
  );
}

export default Sidebar;
