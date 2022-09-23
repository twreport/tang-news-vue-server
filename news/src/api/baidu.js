import request from "@/utils/request";
const baiduApi = {
    get_baidu(data){
        return request(
            {
                url: "/get_baidu",
                method: "post",
                data: data
            }
        )
    }
}
export default baiduApi;