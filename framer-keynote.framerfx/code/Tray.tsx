import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Tray(props) {
  return <System.Tray {...props} />;
}

Tray.defaultProps = {
  ...System.Tray.defaultProps
}; // add same default props from System
addPropertyControls(Tray, {});
