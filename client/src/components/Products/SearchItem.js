import React,{ memo, useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { color } from '../../utils/contants';
import { createSearchParams, useNavigate, useSearchParams} from 'react-router-dom';
import path from '../../utils/path';
import useDebounce from '../../hooks/useDebounce';

const SearchItem = ({category ,name, activeClick, changeActiveClick, type = 'checkbox', handleCurrentPage}) => {

    const [selected, setSelected] = useState([])
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const handleSelected = (e) =>{
        const alreadyEl = selected.find(el => el === e)
        if(alreadyEl){
            setSelected(prev => prev.filter(el=> el!==e))
        }else{
            setSelected(prev => [...prev, e])
        }
    }

    useEffect(()=>{
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]
        if(selected.length > 0){
            queries.color = selected.join(',')
            queries.page = 1
            handleCurrentPage(1)
        }else{
            delete queries.color
        }
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    },[selected])

    
    const debouncePriceFrom = useDebounce(price.from,500)
    const debouncePriceTo = useDebounce(price.to,500)

    useEffect(()=>{
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]
        queries.page = 1
        if(Number(price.from) > 0){
            queries.from = price.from
        }else{
            delete queries.from
        }
        if(Number(price.to) > 0){
            queries.to = price.to
        }else{
            delete queries.to
        }
        handleCurrentPage(1)
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    },[debouncePriceFrom, debouncePriceTo])
    
  return (
    <div onClick={()=>changeActiveClick(name)} 
    className='text-[12px] cursor-pointer p-3 border relative border-gray-800 flex items-center justify-between gap-6'>
        <span className='capitalize'>{name}</span>
        <FaAngleDown />
        {activeClick===name && 
        <div className='top-[104%] left-[-1px] w-fit absolute z-10 p-4 border bg-white min-w-[150px]'>
            {type === 'checkbox' && <div className=''>
                <div className='p-4 justify-between flex gap-8 border-b-[1px]'>
                    <span className='whitespace-nowrap'>{`${selected.length} selected`}</span> 
                    <span onClick={e => {e.stopPropagation(); setSelected([])}} className='underline cursor-pointer'>Reset</span> 
                </div>
                <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                    {color.map((el, index)=>(
                        <div  key={index} className='flex items-center gap-2'>
                            <input 
                            type='checkbox' 
                            value={el} 
                            onChange={()=>handleSelected(el)} 
                            id={el} 
                            checked={selected.some(selectedItem => selectedItem === el)}
                            />
                            <label htmlFor={el} className='capitalize'>{el}</label>
                        </div>
                    ))}
                </div>
            </div>}
            {type === 'input' && <div onClick={e => {e.stopPropagation()}}>
                <div className='p-4 justify-between flex gap-2'>
                    <span onClick={() => setPrice({from: '', to: ''})} className='underline cursor-pointer'>Reset</span> 
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor='from'>From</label>
                        <input 
                        onClick={e => e.stopPropagation()} 
                        type='number' 
                        className='border flex p-2' 
                        id='from'
                        value={price.from}
                        onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                        ></input>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor='to'>To</label>
                        <input 
                        onClick={e => e.stopPropagation()} 
                        type='number' 
                        className='border flex p-2' 
                        id='to'
                        value={price.to}
                        onChange={e => setPrice(prev => ({...prev, to: e.target.value}))} 
                        ></input>
                    </div>
                </div>
            </div>}
        </div>
        }
    </div>
  )
}

export default memo(SearchItem)