import { Override, Data, transform } from "framer"

// This only works correctly when the Preview is displayed at 100%

const appState = Data({
    rotateX: 0,
    rotateY: 0,
})

export function Background(): Override {
    const xTransform = transform([804, 1204], [-45, 45]) // this Frame is 804 more points to the right
    const yTransform = transform([0, 400], [45, -45])

    return {
        onMouseMove(event) {
            appState.rotateX = yTransform(event.pageY)
            appState.rotateY = xTransform(event.pageX)
        },
        style: {
            perspective: 1000,
        },
    }
}

export function Frame(): Override {
    return {
        rotateX: appState.rotateX,
        rotateY: appState.rotateY,
    }
}
