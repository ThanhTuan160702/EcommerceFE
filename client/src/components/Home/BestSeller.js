import React,{ useEffect, useState } from 'react'
import { apiGetProducts } from '../../apis/index'
import { CustomSlider } from '../index'
import { getNewProducts } from '../../store/products/asyncAction'
import { useDispatch, useSelector } from 'react-redux'

const tabs = [
    {
        id:1,
        name: 'best sellers'
    },
    {
        id:2,
        name: 'new arrivals'
    }
]



const BestSeller = () => {

    const [bestSellers, setBestSellers] = useState([])
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const { newProducts } = useSelector(state => state.products)

    const [activedTab, setActivedTab] = useState(1)
  
    const fetchProducts = async() => {
      const response = await apiGetProducts({sort: '-sold',limit: 4, variant: false})
      if(response.success){ 
        setBestSellers(response.mes) 
        setProducts(response.mes)
      }
    }
  
    useEffect(()=>{
      fetchProducts()
      dispatch(getNewProducts())
    },[])

    useEffect(()=>{
      if(activedTab === 1){
        setProducts(bestSellers)
      }else if(activedTab === 2){
        setProducts(newProducts)
      }
    },[activedTab])

  return (
    <div>
        <div className='flex text-[20px] gap-4 pb-4 border-b-2 border-main'>
            {tabs.map(el=>(
                <span 
                key={el.id} 
                className={`font-semibold uppercase text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-main' : ''}`}
                onClick={()=> setActivedTab(el.id)}
                >{el.name}</span>
            ))}
        </div>
        <div className='mt-4 mx-[-10px]'>
            <CustomSlider  key={activedTab} products={products} activedTab={activedTab} />
        </div>
        <div className='w-full flex gap-4 mt-4'>
          <img src='//digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' 
          alt='image1' 
          className='flex-1 object-contain cursor-pointer'
          />
          <img src='//digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' 
          alt='image2' 
          className='flex-1 object-contain cursor-pointer'
          />
        </div>
    </div>
  )
}

export default BestSeller