"use client"

import {motion} from "framer-motion"

export const blurFade = {
    hidden: {opacity: 0, filter: "blur(12px)"},
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1]},
    },
    exit: {
        opacity: 0,
        filter: "blur(12px)",
        transition: {duration: 0.5, ease: [0.33, 1, 0.68, 1]},
    },
}

// обёртка — можно использовать прямо как компонент
export const BlurFade = ({children, delay = 0}: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        variants={blurFade}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        transition={{delay}}
        viewport={{once: true, amount: 0.2}}
    >
        {children}
    </motion.div>
)