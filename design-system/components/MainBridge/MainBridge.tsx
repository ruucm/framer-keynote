import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { sleep, isClient, wem } from "../../../base/utils";
import { SharePropsWithChildren } from "../../../base/utils/SharePropsWithChildren";
import * as System from "../../../design-system";
import { Row, Column } from "ruucm-blocks/layouts";
import mock from "./mock";
import { markdown as md } from "markdown";

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
  width: ${wem(470)}vw;
  height: ${wem(500)}vw;
  top: calc(50% - 44px);
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: ${props => props.selectedTheme.breakpoint.mobile}px) {
    width: 80%;
    height: initial;
  }
`;
const Media = styled.div`
  position: absolute;
  width: ${wem(1178)}vw;
  height: ${wem(803)}vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const PageNumber = styled.div`
  height: 44px;
  width: 100%;
  position: absolute;
  bottom: 15px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Video = styled.video``;

// var md = require("markdown").markdown

export function MainBridge({ theme, mediaLayer, width, height, contentData }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  const [currentPage, setCurrentPage] = useState(0);
  const [reveal, setReveal] = useState(true);
  const [from, setFrom] = useState("right");
  const [markdownData, setMarkdownData] = useState(null);
  const [error, setError] = useState(false);

  const loadContentData = () => {
    fetch(decodeURIComponent(contentData.replace("/preview", "")), {
      method: "GET",
      credentials: "omit",
      redirect: "follow"
    })
      .then(resp => {
        console.log("contentData", contentData);
        console.log("resp", resp);
        if (!resp.ok) {
          console.error(
            "There was an error while the fetching Lottie JSON URL"
          );
          console.log("Printing failed response...");
          console.log(resp);

          setError(true);
          return;
        }
        resp
          .text()
          .then(result => {
            console.log("result", result);
            setMarkdownData(result);

            // parse the markdown into a tree and grab the link references
            var tree = md.parse(result),
              refs = tree[1].references;

            console.log("tree", tree);
            console.log("refs", refs);
          })
          .catch(e => {
            console.error(e);
            console.log("Could not parse a valid JSON from the Lottie URL");
            setError(true);
          });
      })
      .catch(e => {
        setError(true);

        console.error(e);
      });
  };

  useEffect(() => {
    loadContentData();
  }, [contentData]);

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
    if (type === "image") return <Img src={mock[currentPage].mediaUrl} />;
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
              width: isClient && window.innerWidth,
              height: isClient && window.innerHeight
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
              height: height,
              background: selectedTheme.color.background
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
MainBridge.defaultProps = {
  theme: "light"
};
