import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export function Description({
  theme,
  title,
  subTitle,
  paragraph,
  trayTitle,
  trayParagraph,
  reveal
}) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: reveal ? 1 : 0
        }}
        transition={selectedTheme.transitions.long}
      >
        <System.Typography text={title} customColor color="#d85c8e" />
        <System.Spacing height={6} />
        <System.Typography text={subTitle} />
        <System.Spacing height={19} />
        <System.Typography text={paragraph} type="Paragraph" />
        <System.Spacing height={16} />
        <div
          style={{
            position: "relative"
          }}
        >
          <System.Tray title={trayTitle}>
            <System.TrayContent text={trayParagraph} height={330} />
          </System.Tray>
        </div>
      </Wrap>
    </SharePropsWithChildren>
  );
}
Description.defaultProps = {
  theme: "light",
  title: "Music",
  subTitle: "An elevated music experience",
  paragraph:
    "The songs you had in iTunes are now in the Apple Music app. Look in your library to find the music you purchased from the iTunes Store or saved from Apple Music — organized by artists, albums, and songs.Click Recently Added in the sidebar to browse music you’ve added in the last week and month.",
  trayTitle: "Explore new artists and genress",
  reveal: true
};
