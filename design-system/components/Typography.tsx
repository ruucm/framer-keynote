import * as React from "react";
import { useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import "./fonts.css";
import { motion } from "framer-motion";
import { themes } from "../../base";

const P = styled(motion.p)`
  ${props =>
    props.type === "Heading1" &&
    css`
      font-family: ${props.theme.font.type2};
      font-weight: 700;
      font-size: 60px;
      color: ${props.theme.color.body};
    `}
  ${props =>
    props.type === "Heading2" &&
    css`
      font-family: ${props.theme.font.type1};
      font-weight: 700;
      font-size: 40px;
      letter-spacing: -1.2px;
      color: ${props.theme.color.body};
      line-height: 44px;
    `}
  ${props =>
    props.type === "Heading3" &&
    css`
      font-family: ${props.theme.font.type1};
      font-weight: 700;
      font-size: 40px;
      letter-spacing: -1.2px;
      color: ${props.theme.color.body};
    `}
  ${props =>
    props.type === "Paragraph" &&
    css`
      font-family: ${props.theme.font.type2};
      font-weight: 400;
      font-size: 15px;
      color: ${props.theme.color.body};
      line-height: 23px;
    `}
  ${props =>
    props.type === "ButtonText" &&
    css`
      font-family: ${props.theme.font.type2};
      font-weight: 700;
      font-size: 15px;
      color: ${props.theme.color.body};
    `}
  ${props =>
    props.type === "Link" &&
    css`
      font-family: ${props.theme.font.type2};
      font-weight: 400;
      font-size: 15px;
      color: ${props.theme.color.link};
    `}
  /* Custom Color Support */
  ${props =>
    props.customColor &&
    props.color &&
    css`
      color: ${props.color};
    `}
  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}

/* background: pink; */
${props =>
  props.theme &&
  css`
    transition: ${props.theme.transitions.long.duration}s color ease-in-out;
  `}
`;

export function Typography({
  text,
  children, // except it to prevent forwardRef Error
  theme,
  minimized,
  type,
  ...props
}) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <P
      {...props}
      type={type}
      theme={selectedTheme} // add default theme
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

Typography.defaultProps = {
  text: "Type Text",
  type: "Heading2",
  lineType: "line-1",
  customColor: false,
  color: "#000000",
  align: "left",
  theme: "light",
  minimized: false
};
