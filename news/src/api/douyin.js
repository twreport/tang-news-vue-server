import request from "@/utils/request";
const douyinApi = {
    get_douyin(data){
        return request(
            {
                url: "/get_douyin",
                method: "post",
                data: data
            }
        )
    }
}
export default douyinApi;