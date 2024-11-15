import './root.css';
import styled from "styled-components";

// export type FormFooterProps = {
//     theme: any, //Use appropriate type
//     position?: string,
//     bottom?: string;
// }
// const PageContainer = styled.div<any>`
//     margin: auto;
//     font-family: "sans-serif";
//     text-align: center;

//     @media ${props => (props.color)} { 
//         max-width: 800px;
//     }

//     @media ${props => (props.width)} {
//         max-width: 1400px;
//     }

    // & > div{
    //     width: 10%;
    //     background: green;
    // }
    // &:hover {
    //     background: green;
    // }
// `;
export const PageContainer = styled.div<any>`
    position: relative;
    width: 100%;
    // height: calc(100vh - var(--header-height) - 30px);
    height: auto;
`;

export const PageFooterSpaceContainer = styled(PageContainer)`
    width: 100%;
    height: 20vh;
`;

// -------------------------------------------------------------------------------------
// Label style
export const LabelText = styled.div<any>`
    
`;

// Option 
export const FilterSelectorContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    padding: 0 10px;
`;

export const SelectOptionType = styled.select`
    width: 10em;
    height: auto;
    border: solid 1px var(--gray-400);
    border-radius: 10px;
    font-size: 0.8em;
    color: inherit;
    padding: 5px;
`;


export const SelectOptionValues = styled.option`
    width: 100%;
    height: auto;
`;