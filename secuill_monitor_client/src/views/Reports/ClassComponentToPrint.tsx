import * as React from "react";
import './PrintStyle.css'
// import VerifyPrescription from "../VerifyPrescription/VerifyPrescription";

export type RefType = any | null;
export type ValueType = number | string | Array<number | string | any>;
export type NameType = number | string | any;

// interface type add<Type, Type, . . .>
export interface IComponentToPrint<TRef extends RefType, TName extends NameType>{
    ref: TRef,
    text: TName,
    children: React.ReactNode,
}

// type to use>
export type ComponentToPrintType<TRef extends RefType, TName extends NameType> = IComponentToPrint<TRef, TName> & {
    ref: TRef,
    text: TName,
    header: JSX.Element,
    children: React.ReactNode,
}
export class ComponentToPrint<TRef extends RefType, TName extends NameType> extends React.PureComponent<ComponentToPrintType<TRef, TName>> {
    public state: any;
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    
    // https://plnkr.co/edit/lWk6Yd?preview
    render() {
        // const { text }: any = this.props;
        return (
            <div className="page-container">
                {/* <div className="page-header">
                    I'm The Header
                    <br/>
                </div>

                <div className="page-footer">
                    I'm The Footer
                </div> */}
                <table className="page-table">
                    <thead>
                        <tr>
                            <th>
                                <div className="page-header-space">
                                    { this.props.header }
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                {/* use page break */}
                                {/* <div className="page">PAGE 1</div> */}
                                { this.props.children }
                            </td>
                        </tr>                         
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <div className="page-footer-space"></div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export const FunctionalComponentToPrint = React.forwardRef((props: any, ref: any) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} text={ props.text } header={ props.header } >{ props.children }</ComponentToPrint>;
});

