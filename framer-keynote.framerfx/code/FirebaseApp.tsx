import * as React from "react";
import { Override, Data } from "framer";
// import { useCollection } from "react-firebase-hooks/firestore";
import * as firebase from "firebase/app";
// import "firebase/firestore";
import { useListVals } from "react-firebase-hooks/database";

export function ChatThread0(props): Override {
  // const [userInput, setUserInput] = useState("");
  const ref = firebase.database().ref("messages");
  const [values, loading, error] = useListVals(ref);
  //   console.log("value", value);
  return {
    messages: values
  };
}

export function ChatInput(props): Override {
  const ref = firebase.database().ref("messages");
  const [values, loading, error] = useListVals(ref);
  return {
    addMessage: newValue => {
      ref.set([...values, newValue]);
    }
  };
}
