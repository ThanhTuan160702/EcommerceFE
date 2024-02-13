import React from 'react'
import { Banner, Sidebar, BestSeller, DealDaily, FeartureProducts, CustomSlider} from '../../components/index'
import { useSelector } from 'react-redux'
import { IoIosArrowForward } from "react-icons/io";
import { createSearchParams, useNavigate } from 'react-router-dom';


const Home = () => {


  const navigate = useNavigate()

  const handleBrand = (category, brand) => {
    navigate({
      pathname: `${category?.toLowerCase()}`,
      search: createSearchParams({brand}).toString()
    })
  }

  const { newProducts } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.app)

  return (
    <>
      <div className='w-main flex mt-6'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto'>
          <Sidebar />
          <DealDaily/>
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto '>
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className='w-main my-8'>
        <FeartureProducts />
      </div>
      <div className='my-8 w-main'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
        <div className='mt-4 mx-[-10px]'>
          <CustomSlider products={newProducts}/>
        </div>
      </div>
      <div className='my-8 w-main'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
        <div className='flex flex-wrap gap-4 mt-4'>
            {categories?.filter(el => el.image)?.map(el => (
              <div key={el._id} className='w-[396px]'>
                <div className='border flex p-4 gap-4'>
                  <img src={el?.image} alt='image1' className='w-[144px] flex-1 h-[170px] object-cover'/>
                  <div className='flex-1 text-gray-700'>
                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                    <ul className='text-sm mt-2'>
                      {el.brand.map(item => (
                        <span key={item} className='flex items-center gap-1 text-gray-500'>
                          <IoIosArrowForward size={14}/>
                          <li onClick={() => handleBrand(el.title,item)} className='hover:text-main cursor-pointer'>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='my-8 w-full'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>BLOG POSTS</h3>
        </div>
      </div>
    </>
  )
}

export default Home