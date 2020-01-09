import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Tray(props) {
  return <System.Tray {...props} />;
}

Tray.defaultProps = {
  width: 380,
  height: 52,
  ...System.Tray.defaultProps
}; // add same default props from System
addPropertyControls(Tray, {
  title: {
    type: ControlType.String
  },
  expanded: {
    type: ControlType.Boolean
  },
  children: {
    type: ControlType.ComponentInstance
  }
});
