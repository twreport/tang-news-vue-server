import request from "@/utils/request";
const weixinApi = {
    get_weixin(data){
        return request(
            {
                url: "/get_weixin",
                method: "post",
                data: data
            }
        )
    },

    get_weixin_test(){
        return request({
                url: "/",
            method: "get"
            }
        )
    }
}
export default weixinApi;