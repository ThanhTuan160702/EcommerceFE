import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams, useNavigate, createSearchParams} from 'react-router-dom'
import { BreadCrumbs,InputSelect,Pagination,Product, SearchItem} from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css';
import { sorts } from '../../utils/contants';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {

  const { category } = useParams()
  const [product, setProduct] = useState(null)
  const [activeClick, setActiveClick] = useState(null)
  const [params] = useSearchParams()
  const [sort, setSort] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const fetch = async(queries) =>{
    if(category === 'products'){
      const response = await apiGetProducts({...queries, variant: false})
      setProduct(response)
    }else{
      const response = await apiGetProducts({...queries, category, variant: false})
      setProduct(response)
    }
  }
  useEffect(()=>{
    const queries = Object.fromEntries([...params])
    let priceQuery = {}
    if(queries.from && queries.to){
      priceQuery = {
        $and: [
          {price: {gte: queries.from}},
          {price: {lte: queries.to}}
        ]
      }
      delete queries.price
    }else{
      if(queries.from) queries.price = { gte: queries.from }
      if(queries.to) queries.price = { lte: queries.to }
    }
    delete queries.from
    delete queries.to
    fetch({...priceQuery, ...queries})
    window.scrollTo(0, 0)
  },[params])

  const changeActiveClick = useCallback((name)=>{
    if(activeClick === name){
      setActiveClick(null)
    }else{
      setActiveClick(name)
    }
  },[activeClick])

  const changeValue = useCallback((value)=>{
    setSort(value)
    setCurrentPage(1)
  },[sort])

  useEffect(()=>{
    if(sort){
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({sort}).toString()
      })
  }
  },[sort])

  const handleCurrentPage = useCallback((number)=>{
    if(!Number(number) || Number(number) < 0 || Number(number) > 99){ 
      return
    }else{
      setCurrentPage(number)
    }
  },[currentPage])

  const handleChangeCurrentPage = useCallback((text)=>{
    if(text==='-' && +currentPage > 1){
      setCurrentPage(+currentPage-1)
    }
    if(text==='+' && +currentPage < 99){
      setCurrentPage(+currentPage+1)
    }
  },[currentPage])

  return (
    <div className='w-full mt-[-1px]'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <BreadCrumbs category={category}/>
        </div>
      </div>
      <div className='w-main flex m-auto border p-4 mt-8'>
        <div className='w-4/5 flex flex-col gap-2'>
            <span>Filter by</span>
            <div className='flex gap-2'>
              <SearchItem handleCurrentPage={handleCurrentPage} category={category} name='price' activeClick={activeClick} type='input' changeActiveClick={changeActiveClick}/>
              <SearchItem handleCurrentPage={handleCurrentPage} category={category} name='color' activeClick={activeClick} changeActiveClick={changeActiveClick}/>
            </div>
        </div>
        <div className='w-1/5 flex flex-col gap-2'>
            <h1>Sort by</h1>
            <InputSelect value={sort} options={sorts} changeValue={changeValue}/>
        </div>
      </div>
      <div className='w-main m-auto mt-4 '>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex gap-4"
        columnClassName="my-masonry-grid_column"
      >
        {product?.mes?.map((el)=>(
          el.variant === false && (
          <div className='border mb-4'>
            <Product isImage={true} productData={el} />
          </div>
        )))}
      </Masonry>
      </div>
      <div className='w-main m-auto flex justify-end'>
        <Pagination totalPage={product?.counts} currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage} handleCurrentPage={handleCurrentPage}/>
      </div>
    </div>
  )
}

export default Products