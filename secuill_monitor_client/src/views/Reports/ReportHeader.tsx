import styled from "styled-components";
import { cFormatDateTime } from "../../helper/convertDateForm";

const HeaderContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const HeaderTop = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 5px 10px;
`;

const HeaderFooter = styled.div`
    position: relative;
    font-size: var(--font-size-md);
    width: 100%;
    background-color: var(--primary-300);
    color: #fff;
    padding: 5px 0px;
`;

const DisplayTextContent = styled.div`
    // position: relative;
    width: fit-content;
`;

const DisplayText = styled.p`
    font-size: var(--font-size-sm);
`;



const HeaderAmountRefill = (props: any) => {
    return(
        <HeaderContent>
            <HeaderTop>
                <DisplayTextContent>
                    <DisplayText>{ props.description1 }</DisplayText>
                </DisplayTextContent>

                <DisplayTextContent>
                    <DisplayText>วันที่ { cFormatDateTime(new Date()) }</DisplayText>
                </DisplayTextContent>
            </HeaderTop>
            <HeaderFooter>
                { props.title }
            </HeaderFooter>
        </HeaderContent>
    )
}

// export default HeaderAmountRefill;

export const FunctionalReportHeader = (props: any) => {
    // eslint-disable-line max-len
    return <HeaderAmountRefill description1={ props.description1 } title={ props.title }/>;
};
