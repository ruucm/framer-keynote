import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function MainBridge(props) {
  return <System.MainBridge {...props} />;
}

MainBridge.defaultProps = {
  width: 1920,
  height: 1080,
  ...System.MainBridge.defaultProps
}; // add same default props from System
addPropertyControls(MainBridge, {});
