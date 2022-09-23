import axios from "axios";
console.log(process.env.VUE_APP_BASE_API)
console.log(process.env.VUE_APP_SERVICE_URL)

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20000
});

export default request;