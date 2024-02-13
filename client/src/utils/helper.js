import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
export const formatSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatPrice = number => Number(number?.toFixed(1)).toLocaleString()
export const phoneNumberRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
export const renderStar = (number) => {
    const stars = []
    for(let i=0;i<+number;i++){
        stars.push(<FaStar color="orange" key={i}/>)
    }
    for(let i=5;i>+number;i--){
        stars.push(<FaRegStar color="orange" key={i}/>)
    }
    return stars
}
export const ValidateEmail = (mail) => { 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return false
    }else{
        return true
    }
}

export const generateRange = (start, end) => {
    const length = end+1-start
    return Array.from({length},(_,index)=>start+index)
}

export const getBase64 = (file) => {
    if(!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
 }