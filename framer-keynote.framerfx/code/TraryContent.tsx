import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function TrayContent(props) {
  return <System.TrayContent {...props} />;
}

TrayContent.defaultProps = {
  width: 380,
  height: 52,
  ...System.TrayContent.defaultProps
}; // add same default props from System
addPropertyControls(TrayContent, {
  text: {
    type: ControlType.String
  }
});
