import React from 'react'
import { motion } from 'motion/react';
type Props = {
    time: number,
    width?: number,
    height?: number,
    color?: string
}

const Loader = (props: Props) => {
    const { height = 4, width = 500, color = '#000000', time } = props;
    return (
        <motion.div
            className="bg-gray-900 dark:bg-white"
            style={{
                height: `${height}px`,
                width: `${width}px`,
            }}
            transition={{
                duration: time,
                width: { delay: 0.2, duration: 0.5, ease: "easeInOut" },

            }}

            initial={{
                width: 0,
            }}
            animate={{
                width: `${width}px`,
            }}>


        </motion.div>
    )
}

export default Loader