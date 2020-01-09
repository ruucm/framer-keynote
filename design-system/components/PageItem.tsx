import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { sleep } from "../../base/utils";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";
import { Row, Column } from "ruucm-blocks/layouts";
import mock from "./mock";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const StyledColumn = styled(Column)`
  position: relative;
  padding: 0 110px;
`;
const Description = styled.div`
  position: absolute;
  width: 470px;
  height: 500px;
  top: calc(50% - 44px);
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Media = styled.div`
  position: absolute;
  width: 1178px;
  height: 803px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const PageNumber = styled.div`
  height: 44px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Video = styled.img``;

export function PageItem({ theme, mediaLayer, width, height }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  const [currentPage, setCurrentPage] = useState(0);
  const [reveal, setReveal] = useState(true);
  const [from, setFrom] = useState("right");

  const prevPageAnim = async () => {
    setFrom("right");
    setReveal(false);
    await sleep(selectedTheme.transitions.short.duration);
    setFrom("left");
    setReveal(true);
  };
  const nextPageAnim = async () => {
    setFrom("left");
    setReveal(false);
    await sleep(selectedTheme.transitions.short.duration);
    setFrom("right");
    setReveal(true);
  };

  const MediaLayer = ({ type }) => {
    if (type === "image")
      return (
        <div>
          <Img src={mock[currentPage].mediaUrl} />
        </div>
      );
    else if (type === "video")
      return (
        <div>
          <Video width="320" height="240" controls>
            <source src={mock[currentPage].mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </div>
      );
  };

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        <Row>
          <StyledColumn
            col={4}
            style={{
              width: width,
              height: height
            }}
          >
            <Description>
              <System.Description
                title={mock[currentPage].descTitle}
                subTitle={mock[currentPage].descSubTitle}
                paragraph={mock[currentPage].descParagraph}
                trayTitle={mock[currentPage].descTrayTitle}
                reveal={reveal}
              />
            </Description>
            <PageNumber>
              <System.PageNumber
                currentPage={currentPage}
                onIconLeftClick={async () => {
                  await prevPageAnim();
                  setCurrentPage(currentPage - 1);
                }}
                onIconRightClick={async () => {
                  await nextPageAnim();
                  setCurrentPage(currentPage + 1);
                }}
              />
            </PageNumber>
          </StyledColumn>
          <Column
            col={8}
            style={{
              width: width,
              height: height
            }}
          >
            <Media>
              <System.MediaContainer
                content={[<MediaLayer type={mock[currentPage].mediaType} />]}
                reveal={reveal}
                from={from}
              />
            </Media>
          </Column>
        </Row>
      </Wrap>
    </SharePropsWithChildren>
  );
}
PageItem.defaultProps = {
  theme: "light"
};
