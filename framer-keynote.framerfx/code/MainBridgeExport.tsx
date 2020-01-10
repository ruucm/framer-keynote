import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function MainBridgeExport(props) {
  return <System.MainBridgeExport {...props} />;
}

MainBridgeExport.defaultProps = {
  width: 1920,
  height: 1080,
  ...System.MainBridgeExport.defaultProps
}; // add same default props from System
const variantTitles = {
  framerLayer: "FramerLayer"
};
const variantKeys = Object.keys(variantTitles);
addPropertyControls(MainBridgeExport, {
  ...variantKeys.reduce(
    (object, key) => ({
      ...object,
      [key]: {
        title: variantTitles[key],
        type: ControlType.Array,
        propertyControl: { type: ControlType.ComponentInstance },
        maxCount: key === "children" || key === "auto" ? 1 : null
      }
    }),
    {}
  ),
  contentData: {
    type: ControlType.File,
    allowedFileTypes: ["md"]
  }
});
