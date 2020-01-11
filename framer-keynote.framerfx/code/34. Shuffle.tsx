import { Override, Data } from "framer";

const positions = [
  { top: 0, left: 0 },
  { top: 0, left: 85 },
  { top: 85, left: 85 },
  { top: 85, left: 0 }
];

const appState = Data({
  position: 0
});

export function Container(): Override {
  setTimeout(() => {
    appState.position = appState.position + 1;
  }, 1000);

  return {};
}

export function Squares(props): Override {
  return {
    top: positions[(appState.position + Number(props.name)) % 4].top,
    left: positions[(appState.position + Number(props.name)) % 4].left,
    key: props.name,
    positionTransition: {
      type: "spring",
      stiffness: 350,
      damping: 25
    }
  };
}
