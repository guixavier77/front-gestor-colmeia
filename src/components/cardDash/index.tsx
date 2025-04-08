import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const CardDash = ({ icon, title, value }: any) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let currentValue = 0
    const targetValue = value
    const increment = targetValue / 100
    const interval = setInterval(() => {
      currentValue += increment
      if (currentValue >= targetValue) {
        currentValue = targetValue
        clearInterval(interval)
      }
      setDisplayValue(Math.floor(currentValue))
    }, 20)

    return () => clearInterval(interval)
  }, [value])

  return (
    <div className="flex items-center bg-black rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
      <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon, {
          style: {
            fontSize: 58,
            color: '#FFFFFF',
          },
        })}
      </div>
      <div className="ml-2 text-white">
        <motion.p
          className="text-4xl font-bold"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {displayValue}
        </motion.p>
        <p className="text-base font-extralight">{title}</p>
      </div>
    </div>
  )
}

export default CardDash
