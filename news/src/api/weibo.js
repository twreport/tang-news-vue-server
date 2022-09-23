import request from "@/utils/request";
const weiboApi = {
    get_weibo(data){
        return request(
            {
                url: "/get_weibo",
                method: "post",
                data: data
            }
        )
    }
}
export default weiboApi;