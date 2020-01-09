import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const IconLeft = styled(motion.div)`
  width: 44px;
  height: 44px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;
const IconRight = styled(motion.div)`
  width: 44px;
  height: 44px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;
const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function PageNumber({ theme, currentPage, totalPage }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        <IconLeft
          whileHover={{
            backgroundColor: selectedTheme.color.border
          }}
        >
          <System.Icon
            icon="ChevronLeft"
            color={selectedTheme.color.secondary}
          />
        </IconLeft>
        <Text>
          <System.Typography
            text={currentPage + 1 + " of " + totalPage}
            type="paragraph"
          />
        </Text>
        <IconRight
          whileHover={{
            backgroundColor: selectedTheme.color.border
          }}
        >
          <System.Icon
            icon="ChevronRight"
            color={selectedTheme.color.secondary}
          />
        </IconRight>
      </Wrap>
    </SharePropsWithChildren>
  );
}
PageNumber.defaultProps = {
  theme: "light",
  currentPage: 0,
  totalPage: 14
};
