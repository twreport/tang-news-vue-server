import request from "@/utils/request";
const resultApi = {
    get_result(data){
        return request(
            {
                url: "/get_result",
                method: "post",
                data: data
            }
        )
    }
}
export default resultApi;