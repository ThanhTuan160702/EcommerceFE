import React from 'react'

const InputFill = ({value, setValue, nameKey, type, placeholder}) => {
  return (
    <div className='w-full relative'>
        <input 
        type={type || 'text'} 
        name={nameKey}
        className='px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none bg-gray-300 placeholder:text-black'  
        placeholder={placeholder}
        value={value}
        onChange={el => setValue(prev => ({...prev, [nameKey]: el.target.value}))}
        />
    </div>
  )
}

export default InputFill