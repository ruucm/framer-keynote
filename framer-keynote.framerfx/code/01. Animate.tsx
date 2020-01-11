import { Override } from "framer"

export function Animate(): Override {
    return {
        animate: { rotate: 360 },
        transition: { duration: 2 },
    }
}
