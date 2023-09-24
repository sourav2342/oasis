import styles, { css } from "styled-components";

const Row = styles.div`
    display: flex;

    ${props => props.type === 'horizontal' && 
    css`
        justify-content: space-between;
        align-items: center;
    `}

    ${props => props.type === 'vertical' && 
    css`
      flex-direction: column;
      gap: 3rem;
    `}

`;




export default Row;