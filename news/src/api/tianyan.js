import request from "@/utils/request";
const tianyanApi = {
    get_tianyan(data){
        return request(
            {
                url: "/get_tianyan",
                method: "post",
                data: data
            }
        )
    }
}
export default tianyanApi;