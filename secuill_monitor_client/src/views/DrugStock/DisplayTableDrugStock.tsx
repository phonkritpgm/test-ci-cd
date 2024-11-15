import styled from "styled-components";

const DisplayTableDrugStock = (props: any) => {
    return(
        <DisplayTableDrugStockContainer>
            <HeaderContainer bgColor={ "#eee" }>
                <HeaderText>
                    { props.headerTxt }
                </HeaderText>
            </HeaderContainer>
            <TableDisplayContainer>
                <Table>
                    <Thead>
                        <tr>
                            <th>รหัสยา</th>
                            <th>ชื่อยา</th>
                            <th>คงเหลือ</th>
                            <th>MAX</th>
                            <th>MIN</th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            props.data == undefined ? (
                                <></>
                            ) : props.data.length == 0 || props.data.length == undefined ? (
                                <></>
                            ) : (
                                props.data && (
                                    <tr>
                                        <td></td>
                                    </tr>
                                )
                            )                        
                        }
                       
                    </Tbody>
                </Table>
            </TableDisplayContainer>
        </DisplayTableDrugStockContainer>
    )
}

export default DisplayTableDrugStock;

// css in page
const DisplayTableDrugStockContainer = styled.div`
    position: relative;
    width: auto;
`;

const HeaderContainer = styled.div<any>`
    padding: 10px 20px;
    background-color: ${ props => ( props.bgColor ) };
`;

const HeaderText = styled.h2`
    color: #fff;
`;

const TableDisplayContainer = styled.div`
    padding: 10px 20px;
`;

const Table = styled.table`
    padding: 10px 20px;
`;

const Thead = styled.thead`
    padding: 10px 20px;
`;

const Tbody = styled.tbody`
    padding: 10px 20px;
`;