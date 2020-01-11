import { Override, useMotionValue, useTransform } from "framer"

export function Drag_3D_circle(): Override {
    return {
        style: {
            perspective: 2000,
            background:
                "radial-gradient(rgba(255,255,255,0), rgba(255,255,255,0.3))",
        },
    }
}

export function Drag_3D(): Override {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [60, -60])
    const rotateY = useTransform(x, [-100, 100], [-60, 60])

    return {
        // Dragging
        drag: true,
        dragConstraints: { left: 0, top: 0, right: 0, bottom: 0 },
        dragElastic: 0.6,
        // Transformation
        x: x,
        y: y,
        z: 100,
        rotateX: rotateX,
        rotateY: rotateY,
    }
}
