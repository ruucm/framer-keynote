import { Override, Data, motionValue, useTransform } from "framer"

const appState = Data({
    checked: true,
})

const scale = motionValue(0)

export function Frame(): Override {
    const boxVariants = {
        checked: { scale: 1, backgroundColor: "rgba(255, 255, 255, 1)" },
        unchecked: { scale: 0.8, backgroundColor: "rgba(255, 255, 255 ,0.5)" },
    }

    return {
        variants: boxVariants,
        animate: appState.checked ? "checked" : "unchecked",
        transition: { type: "spring", stiffness: 300, damping: 20 },
        onTap() {
            appState.checked = !appState.checked
        },
        scale: scale,
    }
}

export function Animator(): Override {
    return {
        direction: appState.checked ? "normal" : "reverse",
    }
}

export function AnimatorContainer(): Override {
    const opacity = useTransform(scale, [0.8, 0.805], [0, 1])
    return {
        opacity: opacity,
    }
}
