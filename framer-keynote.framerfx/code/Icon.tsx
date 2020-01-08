import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Icon(props) {
  return <System.Icon {...props} />;
}

Icon.defaultProps = {
  height: 64,
  width: 64,
  ...System.Icon.defaultProps
}; // add same default props from System
addPropertyControls(Icon, {
  icon: {
    type: ControlType.String
  },
  color: {
    type: ControlType.Color
  }
});
