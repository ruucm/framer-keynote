import * as React from "react";
import {
  Frame,
  Color,
  RenderTarget,
  motion,
  addPropertyControls,
  ControlType
} from "framer";
import { useState, useEffect } from "react";
// @ts-ignore
import { Icon } from "@framer/benjamin.icon-generator/code/Icon";
import { getUserID, isChrome } from "./Utils";

const customTransition = { type: "spring", stiffness: 300, damping: 40 };

export function ChatInput(props) {
  const { darkMode, accentColor, authorCode } = props;
  const [inputValue, setValue] = useState("");
  const inactiveAccentColor = Color.multiplyAlpha(
    Color.desaturate(Color(accentColor), 100),
    0.3
  );

  const sendMessage = () => {
    if (inputValue.length === 0) return;
    props.addMessage({
      author: authorCode,
      text: inputValue,
      timestamp: Date.now()
    });
    setValue("");
  };

  function keyPress(event) {
    event.persist();
    if (event.key == "Enter") sendMessage();
  }

  return (
    <Frame
      size={"100%"}
      animate={{
        background: darkMode ? "#1A1A1A" : "#ffffff"
      }}
      transition={customTransition}
      initial={false}
      borderRadius={20}
    >
      <Frame
        center
        width={"calc(100% - 64px)"}
        height={52}
        background={null}
        style={{
          width: "calc(100% - 64px)"
        }}
      >
        <motion.input
          animate={{
            background: darkMode ? "#484848" : "#F0F0F0"
          }}
          transition={customTransition}
          initial={false}
          style={{
            ...inputStyle,
            letterSpacing: isChrome ? "-0.3px" : 0,
            color: darkMode ? "#fff" : "#333"
          }}
          onKeyPress={keyPress}
          onChange={event => setValue(event.target.value)}
          tabIndex={0}
          value={inputValue}
          placeholder={"Type a message…"}
        />
        <Frame
          initial={{
            backgroundColor:
              RenderTarget.current() === RenderTarget.canvas
                ? accentColor
                : inactiveAccentColor
          }}
          animate={{
            backgroundColor:
              inputValue.length > 0 ? accentColor : inactiveAccentColor
          }}
          transition={{ duration: 0.15 }}
          onTap={sendMessage}
          whileTap={{ scale: inputValue.length === 0 ? 1 : 0.92 }}
          size={40}
          borderRadius={"50%"}
          right={6}
          center="y"
        >
          <Frame
            size={20}
            initial={{ rotate: 45 }}
            rotate={45}
            background={null}
            center="y"
            left={8}
          >
            <Icon
              height={20}
              width={20}
              color="#fff"
              set="feather"
              icon="send"
            />
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
}

ChatInput.defaultProps = {
  width: 480,
  height: 108,
  accentColor: "#FFAA00",
  darkMode: false,
  authorCode: 1,
  addMessage: () => {
    console.warn("No Override Attached to Input Component");
  }
};
addPropertyControls(ChatInput, {
  authorCode: {
    type: ControlType.Number,
    displayStepper: true
  }
});

const inputStyle: React.CSSProperties = {
  border: "none",
  paddingLeft: 20,
  paddingRight: 56,
  position: "absolute",
  width: "100%",
  height: 52,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  outline: "none",
  resize: "none",
  fontFamily: `-apple-system, system-ui`,
  background: "#f0f0f0",
  borderRadius: 100,
  fontSize: 16,
  paddingBottom: 2
};
// '".SFNSDisplay-Medium", "SFProDisplay-Medium", "SFUIDisplay-Medium", ".SFUIDisplay-Medium",-apple-system, BlinkMacSystemFont, sans-serif',
