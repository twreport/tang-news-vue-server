import request from "@/utils/request";
const neteaseApi = {
    get_netease(data){
        return request(
            {
                url: "/get_netease",
                method: "post",
                data: data
            }
        )
    }
}
export default neteaseApi;