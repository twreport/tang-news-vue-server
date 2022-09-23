import request from "@/utils/request";
const recommendApi = {
    get_recommend(data){
        return request(
            {
                url: "/get_recommend",
                method: "post",
                data: data
            }
        )
    }
}
export default recommendApi;