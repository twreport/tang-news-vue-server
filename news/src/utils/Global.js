const get_timelimt_by_day = function (day) {
    const now_time = new Date().getTime()/1000;
    const interval = day * 24 * 60 * 60;
    const time_limit = Math.round(now_time) - interval;
    return time_limit;
}
const change_limit_day = function (day) {
    const limit_days_list = [1, 2, 4, 7, 14];
    for(let i=0; i< limit_days_list.length; i++)
    {
        if (day > 7) {
            return 1;
        }
        if(limit_days_list[i] > day){
            return limit_days_list[i];
        }
    }
}
export default
{
    get_timelimt_by_day,
    change_limit_day
}