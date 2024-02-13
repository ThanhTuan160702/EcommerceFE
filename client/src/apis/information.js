import axios from "../axios";

export const apiGetInformation = (title) => axios({
    url: `/information/getInformation`,
    method: 'get',
    params: {
        title: title
    }
})