import request from "@/utils/request";
const tencentApi = {
    get_tencent(data){
        return request(
            {
                url: "/get_tencent",
                method: "post",
                data: data
            }
        )
    }
}
export default tencentApi;