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
const variantTitles = {
  mediaLayer: "MediaLayer"
};
const variantKeys = Object.keys(variantTitles);
addPropertyControls(PageItem, {
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
  )
});
