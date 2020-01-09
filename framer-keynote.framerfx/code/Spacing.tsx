import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Spacing(props) {
  return <System.Spacing {...props} />;
}

Spacing.defaultProps = {
  ...System.Spacing.defaultProps,
  show: true
}; // add same default props from System
addPropertyControls(Spacing, {
  height: {
    type: ControlType.Number
  },
  width: {
    type: ControlType.Number
  },
  type: {
    type: ControlType.Enum,
    title: "Type",
    options: ["h", "v"]
  },
  show: {
    type: ControlType.Boolean
  }
});
