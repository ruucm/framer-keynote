import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function MainBridge2(props) {
  return <System.MainBridge2 {...props} />;
}

MainBridge2.defaultProps = {
  width: 1920,
  height: 1080,
  ...System.MainBridge2.defaultProps
}; // add same default props from System
const variantTitles = {
  mediaLayer: "MediaLayer"
};
const variantKeys = Object.keys(variantTitles);
addPropertyControls(MainBridge2, {
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
