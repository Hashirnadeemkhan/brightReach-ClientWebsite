import React, { FC } from 'react'

const Button:FC<{text:string}> = ({text}) => {
    
  return (
<button className="bg-gradient-to-r  from-[#981127] via-[#652046] to-[#24346D] text-white py-2 rounded-full font-semibold lg:px-7 px-5 sm:text-lg text-sm hover:shadow-lg hover:scale-105 ">{text}</button>
  )
}

export default Button
