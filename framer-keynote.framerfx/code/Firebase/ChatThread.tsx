import * as React from "react";
import {
  Scroll,
  Stack,
  useAnimation,
  motion,
  Color,
  Frame,
  RenderTarget,
  addPropertyControls,
  ControlType
} from "framer";
import { useState, useRef, useLayoutEffect } from "react";
import { getUserID, isChrome } from "./Utils";

const customTransition = { type: "spring", stiffness: 300, damping: 40 };

declare global {
  interface Window {
    chatMessageCount: number;
    chatInitialScroll: number;
  }
}

export function ChatThread(props) {
  const { messages, darkMode, accentColor, authorCode } = props;
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const mountTime = useRef(Date.now());
  const [scrollHeight, setScrollHeight] = useState(0);
  const scrollControls = useAnimation();

  useLayoutEffect(() => {
    const top = firstMessageRef.current ? firstMessageRef.current.offsetTop : 0;
    const bottom = lastMessageRef.current
      ? lastMessageRef.current.offsetTop + lastMessageRef.current.offsetHeight
      : 0;
    const totalHeight = bottom - top;
    const newMessage =
      messages.length > 0
        ? messages[messages.length - 1].timestamp > mountTime.current
        : false;

    setScrollHeight(totalHeight);

    if (scrollHeight >= props.height) {
      const scrollAnimProps = {
        y: -scrollHeight + props.height,
        transition: { type: "spring", damping: 30, stiffness: 600 }
      };

      if (newMessage) scrollControls.start(scrollAnimProps);
      else scrollControls.set(scrollAnimProps);
    }
  });

  return (
    <Frame
      animate={{
        background: darkMode ? "#1A1A1A" : "#ffffff"
      }}
      transition={customTransition}
      initial={false}
      borderRadius={18}
      size="100%"
    >
      <Scroll
        width={"calc(100% - 64px)"}
        center
        height={"100%"}
        contentHeight={scrollHeight}
        scrollAnimate={scrollControls}
        initial={{
          opacity: RenderTarget.current() !== RenderTarget.preview ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
        animate={{ opacity: messages.length > 0 ? 1 : 0 }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          {messages.map(({ author = 0, text, timestamp = 0 }, index) => {
            const fromLoggedInUser = author === authorCode;
            const isPastMessage = mountTime.current > timestamp;
            const prevMessageAuthor =
              messages[index - 1] && messages[index - 1].author;
            const nextMessageAuthor =
              messages[index + 1] && messages[index + 1].author;

            const isFirstMessage = prevMessageAuthor !== author;
            const isLastMessage = nextMessageAuthor !== author;

            const [big, small] = [24, 8];
            const messageBorderRadius = `
                        ${isFirstMessage || fromLoggedInUser ? big : small}px
                        ${isFirstMessage || !fromLoggedInUser ? big : small}px 
                        ${isLastMessage || !fromLoggedInUser ? big : small}px 
                        ${isLastMessage || fromLoggedInUser ? big : small}px`;

            const ref =
              index === 0
                ? firstMessageRef
                : index === messages.length - 1
                ? lastMessageRef
                : null;

            return (
              <div key={index} style={{ display: "flex" }} ref={ref}>
                <motion.div
                  style={{
                    marginLeft: fromLoggedInUser ? "auto" : 0,
                    scale: 0
                  }}
                  initial={{
                    scale: !isPastMessage ? 0 : 1
                  }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 40,
                      stiffness: 600
                    }
                  }}
                >
                  <Frame
                    animate={{
                      backgroundColor: fromLoggedInUser
                        ? accentColor
                        : darkMode
                        ? "#5E5E5E"
                        : "#f0f0f0",
                      color: fromLoggedInUser || darkMode ? "#fff" : "#333",
                      borderRadius: messageBorderRadius
                    }}
                    transition={customTransition}
                    initial={false}
                    style={{
                      ...messageStyle,
                      height: "unset",
                      position: "relative",
                      textAlign: "left",
                      letterSpacing: isChrome ? "-0.3px" : "-0.2px",
                      marginTop: isFirstMessage ? 18 : 2
                    }}
                  >
                    {text}
                  </Frame>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Scroll>
    </Frame>
  );
}

ChatThread.defaultProps = {
  width: 480,
  height: 465,
  accentColor: "#FFAA00",
  darkMode: false,
  authorCode: 1,
  messages: [
    { text: "Hey, hows it going?", author: 0 },
    { text: "It's so nice out", author: 0 },
    { text: "I'm great! How are you?", author: getUserID() }
  ]
};
addPropertyControls(ChatThread, {
  authorCode: {
    type: ControlType.Number,
    displayStepper: true
  }
});

const messageStyle: React.CSSProperties = {
  display: "inline-flex",
  overflow: "hidden",
  placeItems: "center",
  fontSize: 16,
  fontWeight: 500,
  overflowWrap: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
  lineHeight: 1.25,
  // background: "#999",
  color: "#fff",
  borderRadius: 20,
  padding: "12px 18px",
  width: "auto",
  fontFamily: `-apple-system, system-ui`,
  maxWidth: 250
};
// ".SFNSText-Regular", "SFProText-Regular", "SFUIText-Regular", SF-Pro-Text, system-ui, BlinkMacSystemFont, -apple-system
/*
`"SFProDisplay-Medium", "SFUIDisplay-Medium", ".SFUIDisplay-Medium", SF-Pro-Text, -apple-system, system-ui`,

*/
