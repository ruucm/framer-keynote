import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function PageNumber(props) {
  return <System.PageNumber {...props} />;
}

PageNumber.defaultProps = {
  ...System.PageNumber.defaultProps
}; // add same default props from System

addPropertyControls(PageNumber, {
  currentPage: {
    type: ControlType.Number,
    displayStepper: true
  },
  totalPage: {
    type: ControlType.Number,
    displayStepper: true
  }
});
