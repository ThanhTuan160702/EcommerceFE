import React, {memo} from 'react'
import Slider from 'react-slick';
import { Product } from '../index'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const CustomSlider = ({products, activedTab}) => {
  return (
    <>
        {products && <Slider className='custom-slider' key={activedTab} {...settings} >
                {products.map(el=>(      
                    <Product key={el._id} productData={el} activedTab={activedTab}/>
                ))}
            </Slider>}
    </>
  )
}

export default memo(CustomSlider)