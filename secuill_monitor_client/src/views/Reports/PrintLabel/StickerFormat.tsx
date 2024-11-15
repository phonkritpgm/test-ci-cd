import React from "react";
import Barcode from "react-barcode";
import { cFormatDateTime } from "../../../helper/convertDateForm";
import styled from "styled-components";

const PrintContainer = styled.div`
    min-width: 7cm;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;

    & div:first-child{
      & p{
        font-weight: 600;
      }
    }

    & div:nth-child(2){
      & p{
        font-size: 14px;
      }
    }
`;

const GroupContent = styled.div`
    padding: 3px 0;
    word-wrap: nowrap;
    
    & p{
      font-size: 16px;
      word-break: break-word;
    }
`;

interface PropsType{
  title: string
  drugName: string
  description: string
  barcode: string
}
export default class StickerFormat extends React.Component<PropsType> {
  render() {
    return (
      <PrintContainer>

        <GroupContent>
          <p>{ this.props.title } ( { cFormatDateTime(new Date()) } )</p>
        </GroupContent>
        
        <GroupContent>
          <p>{ this.props.drugName }</p>
        </GroupContent>
          
        <GroupContent>
          <p>{ this.props.description }</p>
        </GroupContent>

        <GroupContent>
          <Barcode
            value={ this.props.barcode }
            width={ 1.5 }
            height={ 30 }
            fontSize={ 16 }
            displayValue={ true }
            format={"CODE39"}
            margin={ 0 }
          />
        </GroupContent>

      </PrintContainer>
    );
  }
}
