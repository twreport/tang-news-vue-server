<template>
  <van-list v-model="loading" :finished="finished" :finished-text="load_msg" @load="onLoad">
    <van-cell-group v-for="item in result_list" :key="item">
      <van-cell v-if="item.order_type == 'topic'" :title="item.topic_title" :size="large" :border="false"
        :url="item.url" title-class="topic-title">
        <template #right-icon>
          <img v-if="item.is_img" :src="item.img_url" class="topic-img" />
        </template>

        <template #label>
          <div class="img-3-div" v-if="item.is_img_3">
            <img v-for="img_item in item.img_url" v-bind:key="img_item" :src="img_item" class="img-3" />
          </div>
          <div v-if="!item.is_img_3">{{ item.brief }}</div>
          <div v-for="topic_item in item.json_items" :key="topic_item" class="topic-info"><img class="img-item"
              :src="topic_item.logo" /><a class="item-a" :href="topic_item.url">{{
                  topic_item.title
              }}</a></div>

        </template>
      </van-cell>
      <van-cell v-if="item.order_type == 'weixin'" :title="item.title" :label="item.brief" :size="large" :border="false"
        :url="item.url" title-class="weixin-title">
        <template #right-icon>
          <img v-if="item.is_img" :src="item.img_url" class="weixin-img" />
        </template>

        <template #label>
          <div class="img-3-div" v-if="item.is_img_3">
            <img v-for="img_item in item.img_url" v-bind:key="img_item" :src="img_item" class="img-3" />
          </div>
          <div v-if="!item.is_img_3">{{ item.brief }}</div>

        </template>
      </van-cell>
      <van-cell v-if="item.order_type == 'weibo'" :title="item.title" size="large" :url="item.url" :border="false"
        title-class="weibo-top-title">
        <template #label>
          <div v-if="item.is_brief">{{ item.brief }}</div>

        </template>

      </van-cell>
      <van-cell v-if="item.order_type == 'baidu'" :title="item.word" :size="large"  :url="item.url" title-class="baidu-title">
        <template #right-icon>
          <img :src="item.img" class="baidu-img"/>
        </template>
        <template #label>
          <div v-if="item.is_brief">{{ item.brief }}</div>

        </template>
      </van-cell>
      <van-cell v-if="item.order_type == 'douyin'" :title="item.word" :size="large" title-class="douyin-title">
        <template #label>

        </template>
        <template #right-icon>
          <div class="douyin-info"><img src="https://tangwei.cc/imgs/douyin.png" class="douyin-img"/><i class="douyin-i">{{item.position}}</i></div>
        </template>
      </van-cell>
      <van-cell v-if="item.order_type == 'toutiao'" :title="item.Title" :size="large"  :url="item.Url" title-class="toutiao-title">
        <template #right-icon>
          <img :src="item.Image" class="toutiao-img"/>
        </template>
      </van-cell>
      <van-cell v-if="item.order_type == 'sina'" :title="item.title" size="large" :url="item.url"  :border="false" title-class="sina-top-title">

      </van-cell>
      <van-cell v-if="item.order_type == 'netease'" :title="item.title" :size="large" :url="item.url" title-class="netease-title">
        <template #right-icon>
          <div v-if="item.img"><img :src="item.img" class="netease-img"/></div>
        </template>

      </van-cell>
      <van-cell v-if="item.order_type == 'tianyan'" :title="item.title" :size="large" :url="item.url" title-class="tianyan-title">
        <template #right-icon>
          <div v-if="item.img"><img :src="item.img" class="tianyan-img"/></div>
        </template>

      </van-cell>
      <van-cell v-if="item.order_type == 'tencent'" :title="item.title" :size="large" :url="item.url" title-class="tencent-title">
        <template #right-icon>
          <div v-if="item.img"><img :src="item.img" class="tencent-img"/></div>
        </template>

      </van-cell>
    </van-cell-group>
  </van-list>
</template>

<script>
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import {Notify} from 'vant';
import resultApi from "@/api/result.js";
export default {
  name: "result",
  data() {
    console.log('in result!')
    const raw = this.$route.params.search_word;
    const search_word = decodeURI(raw);
    console.log(search_word)
    return {
      result_list: [],
      loading: false,
      finished: false,
      query_data: {
        search_word: search_word,
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'default',
        order_sort: 'desc',
        mode: 1
      },
      load_msg: this.$root.current_limit_days.toString() + "天之内没有更多了..."
    }
  },
  methods: {
    onLoad() {
      console.log("query_data:", this.query_data);
      this.load_data();
    },
    load_data(){
      // 利用全局变量得到时间戳
      this.query_data.time_limit = this.GLOBAL.get_timelimt_by_day(this.$root.current_limit_days);
      // 将搜索天数发送回后天，便于智能排序
      this.query_data.current_limit_days = this.$root.current_limit_days;
      // 将搜索类型传送到后台
      this.query_data.search_type = this.$root.search_type;
      console.log("query_data_after:", this.query_data);
      // 异步更新数据
      resultApi
          .get_result(this.query_data)
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            if(data == 'dict'){
              console.log('dict')
              Notify('分词词典已更新：）')
              this.finished = true;
            }else if(data == 'stop'){
              console.log('stop')
              Notify('停止词词典已更新：）')
              this.finished = true;
            }else{
              for (let i = 0; i < data.length; i++) {
                this.result_list.push(data[i]);
              }
            }
            //将offset +1
            this.query_data.offset = this.query_data.offset + 1;
            this.loading = false;
            // // 加载状态结束
            // this.loading = false;
            // // 数据全部加载完成
            if (this.result_list.length >= 100 || res.data.length == 0) {
              this.finished = true;
            }
          })
    }
  },
  watch: {
    '$root.current_limit_days': {
      handler() {
        this.result_list = [];
        this.loading = false;
        this.finished = false;
        this.query_data = {
          search_word: this.$route.params.search_word,
          limit: 10,
          offset: 0,
          time_limit: 0,
          order_by: 'default',
          order_sort: 'desc',
          mode: 1
        };
        this.load_msg = this.$root.current_limit_days.toString() + "天之内没有更多了...";
        this.load_data();
      }
    }
  },
  components: {
    vanList: List,
    vanCell: Cell,
    vanCellGroup: CellGroup
  }
}

</script>

<style scoped>
.topic-img {
  height: 100px;
  width: 100px;
  margin: 5px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.topic-info {
  /* margin-left: 10px; */
  font-size: 14px;
  color: darkgrey;
}

.topic-title {
  margin-top: 5px;
  font-size: 20px;
}

.topic-foot {
  /* margin-left: 16px; */
  font-size: 14px;
  color: rgb(50, 50, 50);
}

.img-item {
  height: 14px;
  width: 14px;
}

.item-b {
  font-size: larger;
  font-family: Arial, Helvetica, sans-serif;
  color: #c41225;
}

.item-a {
  color: darkgrey;
}

.weixin-img {
  height: 100px;
  width: 100px;
  margin: 5px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.weixin-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.weixin-title {
  margin-top: 5px;
  font-size: 20px;
}

.weibo-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.weibo-title {
  margin-top: 5px;
  font-size: 20px;
}

.weibo-top-title {
  margin-top: 5px;
  /* font-weight: bolder; */
  font-size: 20px;
  /* color: #c41225; */
}

.weibo-img {
  height: 30px;
  width: 30px;
}
.baidu-img {
  height: 80px;
  width: 80px;
  margin: 10px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.baidu-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.baidu-title{
  margin-top: 5px;
  font-size: 20px;
}

.douyin-img {
  height: 20px;
  width: 20px;
}

.douyin-i {
 font-size: larger;
  font-weight: bolder;
}

.douyin-info {
height: 60px;
  line-height: 60px;
  text-align: center;
}

.douyin-title{
  margin-top: 5px;
  font-size: 20px;
}

.toutiao-img {
  height: 80px;
  width: 80px;
  margin: 10px;
}

.toutiao-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.toutiao-title{
  margin-top: 5px;
  font-size: 20px;
}


.sina-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.sina-title {
  margin-top: 5px;
  font-size: 20px;
}

.sina-top-title {
  margin-top: 5px;
  font-size: 20px;
}

.sina-img {
  height: 30px;
  width: 30px;
}

.tencent-img {
  height: 80px;
  width: 100px;
  margin: 10px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.tencent-info {
  margin-left: 20px;
  font-size: 14px;
  color: #545454;
}

.tencent-title {
  margin-top: 5px;
  font-size: 20px;
}

.tianyan-img {
  height: 80px;
  width: 80px;
  margin: 10px;
}

.tianyan-img {
  height: 80px;
  width: 120px;
  margin: 5px;
}

.tianyan-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.tianyan-title {
  margin-top: 5px;
  font-size: 20px;
}

.toutiao-img {
  height: 80px;
  width: 80px;
  margin: 10px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.toutiao-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.toutiao-title{
  margin-top: 5px;
  font-size: 20px;
}
.netease-img {
  height: 80px;
  width: 80px;
  margin: 10px;
}

.img-3 {
  height: 100px;
  width: 100px;
  float: left;
  margin: 2px;
}

.netease-info {
  margin-left: 20px;
  font-size: 14px;
  color: darkgrey;
}

.netease-title {
  margin-top: 5px;
  font-size: 20px;
}

.netease-follow{
  float: left;
  width: 12px;
  height: 12px;
}
</style>