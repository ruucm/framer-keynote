import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import * as System from "../../design-system";

export function Typography(props) {
  return <System.Typography {...props} />;
}

Typography.defaultProps = {
  height: 34,
  width: 153,
  ...System.Typography.defaultProps
}; // add same default props from System
addPropertyControls(Typography, {
  text: {
    type: ControlType.String,
    title: "Text"
  },
  type: {
    type: ControlType.Enum,
    title: "Type",
    options: [
      "Heading1",
      "Heading2",
      "Heading3",
      "Paragraph",
      "ButtonText",
      "Link"
    ]
  },
  lineType: {
    type: ControlType.SegmentedEnum,
    options: ["line-1", "line-2"],
    optionTitles: ["line-1", "line-2"],
    hidden(props) {
      return props.type !== "caption" && props.type !== "headline";
    }
  },
  customColor: {
    type: ControlType.Boolean,
    title: "Custom Color",
    enabledTitle: "Custom",
    disabledTitle: "Nope",
    defaultValue: false
  },
  color: {
    type: ControlType.Color,
    title: "Color",
    hidden(props) {
      return props.customColor === false;
    }
  },
  align: {
    type: ControlType.SegmentedEnum,
    title: "Align",
    options: ["left", "center", "right"],
    optionTitles: ["Left", "Center", "Right"]
  },
  minimized: {
    type: ControlType.Boolean,
    hidden(props) {
      return props.type !== "header-emphasized";
    }
  }
});
