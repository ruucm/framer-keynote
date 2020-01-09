import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Description(props) {
  return <System.Description {...props} />;
}

Description.defaultProps = {
  width: 470,
  height: 500,
  ...System.Description.defaultProps
}; // add same default props from System
addPropertyControls(Description, {
  title: {
    type: ControlType.String
  },
  subTitle: {
    type: ControlType.String
  },
  paragraph: {
    type: ControlType.String
  },
  trayTitle: {
    type: ControlType.String
  }
});
