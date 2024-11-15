//@ts-nocheck
import * as React from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

import { ComponentToPrint } from "./ClassComponentToPrint";

export class ClassComponentContextConsumer extends React.PureComponent {
  componentRef = null;

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      text: "old boring text"
    };
  }

  handleAfterPrint = () => {
    // cconsole.log("`onAfterPrint` called"); // tslint:disable-line no-console
  };

  handleBeforePrint = () => {
    // cconsole.log("`onBeforePrint` called"); // tslint:disable-line no-console
  };

  handleOnBeforeGetContent = () => {
    // cconsole.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    this.setState({ text: "Loading new text...", isLoading: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState(
          { text: "New, Updated Text!", isLoading: false },
          resolve
        );
      }, 2000);
    });
  };

  setComponentRef = (ref: any) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  render() {
    return (
      <div>
        <ReactToPrint
          content={this.reactToPrintContent}
          documentTitle="AwesomeFileName"
          onAfterPrint={this.handleAfterPrint}
          onBeforeGetContent={this.handleOnBeforeGetContent}
          onBeforePrint={this.handleBeforePrint}
          removeAfterPrint
        >
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>
                Print and save to pdf.
              </button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        {this.state.isLoading && (
          <p className="indicator">onBeforeGetContent: Loading...</p>
        )}
        <ComponentToPrint ref={this.setComponentRef} text={this.state.text} />
      </div>
    );
  }
}
