import { useState } from 'react'

export const NumberComponent = () => {
    const [startingNumber, setStarringNumber] = useState<number>(5)

    const handleIncrement = () =>{
      if(startingNumber === 5)
        setStarringNumber(startingNumber + 1)
    }

    const handleDecrement = () =>{
        if(startingNumber === 5 )
           setStarringNumber(startingNumber - 1)  
    }

  return (
    <div className=' flex w-[100px] h-[40px] 
    lg:h-[100px] lg:w-[40px] lg:flex-col lg:m-6
    rounded bg-[#F5F6FA] items-center justify-center gap-[12px]'>
        <div 
        className=' cursor-pointer text-extrabold font-medium text-[#C5C6EF]'
        onClick={handleDecrement}>-</div>
        <div className=' text-base font-extrabold text-[#5357B6]'>{startingNumber}</div>
        <div 
        className=' cursor-pointer text-extrabold font-medium text-[#C5C6EF]'
        onClick={handleIncrement}>+</div>
    </div>
  )
}
