import request from "@/utils/request";
const topicApi = {
    get_topic(data){
        return request(
            {
                url: "/get_topic",
                method: "post",
                data: data
            }
        )
    }
}
export default topicApi;