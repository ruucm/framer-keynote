import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function MediaContainer(props) {
  return <System.MediaContainer {...props} />;
}

MediaContainer.defaultProps = {
  width: 1178,
  height: 803,
  ...System.MediaContainer.defaultProps
}; // add same default props from System
addPropertyControls(MediaContainer, {
  content: {
    type: ControlType.ComponentInstance
  },
  reveal: {
    type: ControlType.Boolean
  }
});
