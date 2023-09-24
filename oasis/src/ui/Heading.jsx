import styled, { css } from "styled-components";

const Heading = styled.h1`  // tagged templated literals in es-6 c
 
 ${props => props.type === 'h1' && 
 css`
    font-size: 20px;
    font-weight: 600;
 `}
  
 ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  line-height: 1.4rem;

`;

export default Heading;