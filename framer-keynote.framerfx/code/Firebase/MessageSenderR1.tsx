// @flow
import * as React from "react";
import { useState } from "react";
import * as firebase from "firebase/app";
import styled, { css } from "styled-components";
import "firebase/database";
import { useList, useListVals } from "react-firebase-hooks/database";

const Wrap = styled.div`
  background: yellow;
  ${props =>
    props.fromMe &&
    css`
      text-align: right;
      background: green;
      color: white;
    `}
`;

export function MessageSenderR1(props) {
  const ref = firebase.database().ref("messages");
  const [userInput, setUserInput] = useState("");
  const [values, loading, error] = useListVals(ref);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "pink",
        whiteSpace: "pre-wrap"
      }}
    >
      <div
        style={{
          width: "100%"
        }}
      >
        <p>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>List: Loading...</span>}
          {!loading && values && (
            <React.Fragment>
              <span>
                List:{" "}
                {values.map((v, id) => (
                  <React.Fragment key={id}>
                    <Wrap fromMe={v.author === 0}>{v.text}</Wrap>
                  </React.Fragment>
                ))}
              </span>
            </React.Fragment>
          )}
        </p>
      </div>

      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            ref.set([...values, { text: userInput, author: 0 }]);
            setUserInput("");
          }}
        >
          <input
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
