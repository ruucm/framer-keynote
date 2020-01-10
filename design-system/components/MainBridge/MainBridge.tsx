import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { sleep, isClient, wem } from "../../../base/utils";
import { SharePropsWithChildren } from "../../../base/utils/SharePropsWithChildren";
import * as System from "../../../design-system";
import { Row, Column } from "ruucm-blocks/layouts";
import mock from "./mock2";
import { markdown as md } from "markdown";
import { useProgressiveImage } from "./useProgressiveImage";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const StyledColumn = styled(Column)`
  position: relative;
  padding: 0 110px;
`;
const Heading1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  height: ${wem(662)}vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PageNumber = styled.div`
  height: 44px;
  width: 100%;
  position: absolute;
  bottom: 15px;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function MainBridge({
  theme,
  mediaLayer,
  designCompLayer,
  width,
  height,
  contentData
}) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  const [currentPage, setCurrentPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const [reveal, setReveal] = useState(true);
  const [from, setFrom] = useState("right");
  const [markdownData, setMarkdownData] = useState(mock);
  const [error, setError] = useState(false);

  const nextPageData = markdownData && markdownData[currentPage];
  let fileName = nextPageData && nextPageData[5][1][1]["href"];
  let fileType = nextPageData && nextPageData[5][1][2];
  const hasMedia = fileType === "image" || fileType === "video";

  const [mainLoaded, currentSrc] = useProgressiveImage({
    src: "/assets/images/" + fileName,
    fallbackSrc: "/assets/images/minimized/" + fileName,
    fileType: fileType
  });

  // useEffect(() => {
  //   const loadNext = () => {
  //     console.log("loadNext!!!");
  //     setCurrentPage(currentPage);
  //     currentPage > currentPage ? nextPageAnimEnd() : prevPageAnimEnd(); // make image animation end after mainImage loaded
  //   };
  //   if (fileType === "image") mainLoaded && loadNext();
  //   else loadNext();
  // }, [mainLoaded]);

  const goPrevPage = async () => {
    if (currentPage >= 1) {
      prevPageAnimStart();
      await sleep(selectedTheme.transitions.long.duration);
      prevPageAnimEnd();
      setCurrentPage(currentPage - 1);
    } else alert("It's the first page");
  };
  const goNextPage = async () => {
    if (currentPage < markdownData.length - 1) {
      nextPageAnimStart();
      await sleep(selectedTheme.transitions.long.duration);
      nextPageAnimEnd();
      setCurrentPage(currentPage + 1);
    } else alert("It's the last page");
  };

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
            // parse the markdown into a tree and grab the link references
            var tree = md.parse(result);
            console.log("tree", tree);

            let res = [[]];
            let resIndex = 0;
            for (let i = 1; i < tree.length; i++) {
              const element = tree[i];
              if (element[0] === "hr") {
                resIndex++;
                res[resIndex] = [];
              } else {
                res[resIndex].push(element);
              }
            }
            setMarkdownData(res);
          })
          .catch(e => {
            console.error(e);
            console.log("Could not parse a valid Data from the Markdown URL");
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

  const prevPageAnimStart = async () => {
    setFrom("right");
    setReveal(false);
  };
  const prevPageAnimEnd = async () => {
    setFrom("left");
    setReveal(true);
  };
  const nextPageAnimStart = async () => {
    setFrom("left");
    setReveal(false);
  };
  const nextPageAnimEnd = async () => {
    setFrom("right");
    setReveal(true);
  };

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        {hasMedia ? (
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
                  title={markdownData[currentPage][0][2]}
                  subTitle={markdownData[currentPage][1][2]}
                  paragraph={markdownData[currentPage][2][1]}
                  trayTitle={markdownData[currentPage][3][2]}
                  trayParagraph={markdownData[currentPage][4][1]}
                  reveal={reveal}
                />
              </Description>
              <PageNumber>
                <System.PageNumber
                  currentPage={currentPage}
                  onIconLeftClick={goPrevPage}
                  onIconRightClick={goNextPage}
                />
              </PageNumber>
            </StyledColumn>
            <Column
              col={8}
              style={{
                width: width,
                height: height,
                background: selectedTheme.color.background,
                overflow: "hidden"
              }}
            >
              <Media>
                <System.MediaContainer
                  content={[
                    <System.MediaLayer
                      key={0}
                      type={fileType}
                      fileName={fileName}
                      currentPage={currentPage}
                    />
                  ]}
                  reveal={reveal}
                  from={from}
                />
              </Media>
            </Column>
          </Row>
        ) : (
          <Row>
            <StyledColumn
              col={12}
              style={{
                width: width,
                height: height
              }}
            >
              <Heading1>
                <System.Typography
                  type="Heading1"
                  text={markdownData[currentPage][0][2]}
                />
              </Heading1>
              <PageNumber>
                <System.PageNumber
                  currentPage={currentPage}
                  onIconLeftClick={goPrevPage}
                  onIconRightClick={goNextPage}
                />
              </PageNumber>
            </StyledColumn>
          </Row>
        )}
      </Wrap>
    </SharePropsWithChildren>
  );
}
MainBridge.defaultProps = {
  theme: "light"
};
