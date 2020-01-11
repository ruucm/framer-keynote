import * as React from "react";
import { Frame, useCycle, motion, Color } from "framer";

const customTransition = { type: "spring", stiffness: 300, damping: 40 };

export function ChatTemplate({
  darkMode,
  accentColor: rawAccentColor,
  toggleDarkMode
}) {
  const accentHue = Color.toHsl(Color(rawAccentColor)).h;
  const prevColor = React.useRef(accentHue);
  const accentColor = `hsl(${Math.floor(accentHue)},100%, 50%)`;

  return (
    <Frame
      animate={{
        backgroundColor: accentColor
      }}
      transition={customTransition}
      initial={false}
      size={"100%"}
    >
      <Frame
        size="100%"
        background={
          "linear-gradient(151deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 100%)"
        }
      />
      <Frame
        center
        animate={{
          background: darkMode ? "#1A1A1A" : "#ffffff"
        }}
        transition={customTransition}
        initial={false}
        style={{
          position: "absolute",
          width: "482px",
          height: "677px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow:
            "0px 22px 85px 0px rgba(92, 38, 0, 0.18), inset 0px 0px 1px 1px hsla(0, 0%, 9%, 0.12), 0px 72px 75px -40px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Title */}
        <motion.h1
          animate={{
            color: darkMode ? "#ffffff" : "#000000"
          }}
          transition={customTransition}
          initial={false}
          style={{
            fontFamily: `".SFNSDisplay-Bold", "SFProDisplay-Bold", "SFUIDisplay-Bold", ".SFUIDisplay-Bold", sans-serif`,
            color: "#000",
            fontSize: "36px",
            letterSpacing: "-0.2px",
            margin: 0,
            lineHeight: 1.2,
            position: "absolute",
            top: 34,
            left: 96
          }}
        >
          Chat
        </motion.h1>

        {/* TopLeft Circle */}
        <Frame
          image={
            "https://d33wubrfki0l68.cloudfront.net/bb99f79a012a1a3d5abf08afa4dfcac7252d8796/1169b/static/people/emily.jpg"
          }
          style={{
            top: 32,
            left: 32,
            width: "48px",
            height: "48px",
            backgroundColor: accentColor,
            borderRadius: "50px"
          }}
        ></Frame>

        <Frame
          left={8}
          top={112}
          animate={{
            background: darkMode
              ? "rgba(232, 232, 232, 0.02)"
              : "rgba(232, 232, 232, 0.5)",
            borderColor: darkMode ? "#444" : "#d4d4d4"
          }}
          transition={customTransition}
          initial={false}
          style={{
            width: "464px",
            height: "449px",
            backgroundColor: "rgba(232, 232, 232, 0.5)",
            overflow: "visible",
            borderRadius: "16px",
            border: "1px dashed #d4d4d4"
          }}
        >
          <Frame
            center
            background={null}
            animate={{
              color: darkMode ? "#ffffff" : "#000000"
            }}
            transition={customTransition}
            initial={false}
            style={{
              width: "100px",
              height: "20px",
              opacity: 0.2,
              fontFamily: `".SFNSDisplay-Bold", "SFProDisplay-Bold", "SFUIDisplay-Bold", ".SFUIDisplay-Bold", sans-serif`,
              color: "#000000",
              fontSize: "17px",
              letterSpacing: "0.22px",
              lineHeight: 1.2,
              textAlign: "center"
            }}
          >
            Chat Thread
          </Frame>
        </Frame>
        <Frame
          animate={{
            background: darkMode
              ? "rgba(232, 232, 232, 0.02)"
              : "rgba(232, 232, 232, 0.5)",
            borderColor: darkMode ? "#444" : "#d4d4d4"
          }}
          transition={customTransition}
          initial={false}
          style={{
            width: "464px",
            height: "100px",
            backgroundColor: "rgba(232, 232, 232, 0.5)",
            overflow: "visible",
            borderRadius: "16px",
            border: "1px dashed #d4d4d4"
          }}
          bottom={8}
          left={8}
        >
          <Frame
            center
            animate={{
              color: darkMode ? "#ffffff" : "#000000"
            }}
            transition={customTransition}
            initial={false}
            background={null}
            style={{
              width: "100px",
              height: "20px",
              opacity: 0.2,
              fontFamily: `".SFNSDisplay-Bold", "SFProDisplay-Bold", "SFUIDisplay-Bold", ".SFUIDisplay-Bold", sans-serif`,
              color: "#000000",
              fontSize: "17px",
              letterSpacing: "0.22px",
              lineHeight: 1.2,
              textAlign: "center"
            }}
          >
            Chat Input
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
}

ChatTemplate.defaultProps = {
  width: 776,
  height: 812,
  accentColor: "#FFAA00",
  darkMode: false,
  toggleDarkMode: () => {
    console.warn("No Override Attached to Controller Component");
  }
};
