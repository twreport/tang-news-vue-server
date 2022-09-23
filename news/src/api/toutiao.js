import request from "@/utils/request";
const toutiaoApi = {
    get_toutiao(data){
        return request(
            {
                url: "/get_toutiao",
                method: "post",
                data: data
            }
        )
    }
}
export default toutiaoApi;