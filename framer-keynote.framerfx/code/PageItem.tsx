import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function PageItem(props) {
  return <System.PageItem {...props} />;
}

PageItem.defaultProps = {
  width: 1920,
  height: 1080,
  ...System.PageItem.defaultProps
}; // add same default props from System
addPropertyControls(PageItem, {});
