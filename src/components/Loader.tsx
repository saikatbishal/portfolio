import React from 'react'
import {motion} from 'motion/react';
type Props = {
    time: number,
    width?: number,
    height?: number, 
    color?:string
}

const Loader = (props: Props) => {
    const {height = 4, width = 500, color = '#45d8ff', time} = props;
  return (
    <motion.div 
    className="border border-b"
    style={{
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: color
    }}
    transition={{
        duration:time,
        width: { delay: 0.2, duration: 0.5, ease: "easeInOut" },

    }}
    
    initial={{
        width: 0,
    }}
    animate={{
        width: `${width}px`,  
        backgroundColor: color,
    }}>


    </motion.div>
  )
}

export default Loader