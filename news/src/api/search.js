import request from "@/utils/request";
const searchApi = {
    get_keywords(){
        return request(
            {
                url: "/get_keywords",
                method: "get"
            }
        )
    }
}
export default searchApi;