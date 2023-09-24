import styled, {css} from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
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
const StyledHeader = styled.header`
    padding: 1.2rem 4.8rem;
    display: flex;
    gap:2.4rem;
    align-items: center;
    justify-content: flex-end;

    ${(props) => theme[props.theme]}

    /* --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937; */
`;

function Header() {

  const { isDarkMode } = useDarkMode();

  return (
    <StyledHeader theme={isDarkMode ? "dark": "light"} >
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
