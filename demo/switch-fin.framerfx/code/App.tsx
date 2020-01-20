import * as React from "react";
import {
  Override,
  Data,
  useMotionValue,
  useAnimation,
  transform
} from "framer";
import { useSwitch } from "@framer/tishogeorgiev.switch/code";

// let controls;
// export function SwitchButton(): Override {
//   controls = useSwitch();

//   return {
//     onTap: () => {
//       //   controls.setSwitchState("sharedSwitch", 1);
//     }
//   };
// }

export function DragScale(props): Override {
  const controls = useSwitch();
  const x = useMotionValue(0);
  const dragAnim = useAnimation();
  x.onChange(x => {
    dragAnim.start({
      scale: transform(x, [-300, 0, 300], [0.7, 1, 1.5]),
      transition: {
        duration: 0
      }
    });
  });
  return {
    x: x,
    drag: true,
    dragConstraints: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    dragElastic: 1,
    animate: dragAnim,
    onDragEnd: () => {
      console.log(
        "controls.getSwitchStateIndex",
        controls.getSwitchStateIndex("sharedSwitch")
      );
      let newState = 0;
      if (controls.getSwitchStateIndex("sharedSwitch") === 0) newState = 1;
      if (x.get() < -150) controls.setSwitchState("sharedSwitch", newState);
    }
  };
}
