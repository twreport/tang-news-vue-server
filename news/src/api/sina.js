import request from "@/utils/request";
const sinaApi = {
    get_sina(data){
        return request(
            {
                url: "/get_sina",
                method: "post",
                data: data
            }
        )
    }
}
export default sinaApi;