<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="load_msg"
        @load="onLoad"
    >
      <van-cell-group
          v-for="item in weibo_top_list"
          :key="item"
      >
        <van-cell :title="item.title" size="large" :url="item.url"  :border="false" title-class="weibo-top-title">
          <template #label>
            <div v-if="item.is_brief">{{ item.brief }}</div>
          </template>
        </van-cell>
        <div class="weibo-info">热度：{{ item.hot_num }}</div>
      </van-cell-group>

      <van-cell-group
          v-for="item in weibo_hot_list"
          :key="item"
      >
        <van-cell :title="item.title" size="large" :url="item.url"  :border="false" title-class="weibo-title">
          <template #label>
            <div v-if="item.is_brief">{{ item.brief }}</div>
          </template>
        </van-cell>
        <div class="weibo-info"><img class="left-icon" src="https://tangwei.cc/imgs/weibo.png" />{{ item.author }} 热度：{{ item.hot_num }}</div>
      </van-cell-group>

      <van-cell-group
          v-for="item in weibo_vip_list"
          :key="item"
      >
        <van-cell :title="item.title" size="large" :url="item.url"  :border="false" title-class="weibo-title">
          <template #label>
            <div v-if="item.is_brief">{{ item.brief }}</div>
          </template>
        </van-cell>
        <div class="weibo-info"><img class="left-icon" src="https://tangwei.cc/imgs/weibo.png" />{{ item.author }} 热度：{{ item.hot_num }}</div>
      </van-cell-group>

    </van-list>
  </div>
</template>

<script>
import {List} from 'vant';
import {Cell, CellGroup} from 'vant';
import weiboApi from "@/api/weibo.js";

export default {
  name: "weibo",
  data() {
    return {
      weibo_top_list: [],
      weibo_hot_list: [],
      weibo_vip_list: [],
      loading: false,
      finished: false,
      query_data: {
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'hot_num',
        order_sort: 'desc'
      },
      load_msg: this.$root.current_limit_days.toString() + "天之内没有更多了..."
    }
  },
  methods: {
    onLoad() {
      // 在全局变量中标注当前路径
      this.$root.current_path = this.$route.path;
      console.log("current_path:", this.$root.current_path)
      this.load_data();
    },
    load_data() {
      // 利用全局变量得到时间戳
      this.query_data.time_limit = this.GLOBAL.get_timelimt_by_day(this.$root.current_limit_days);
      // 将搜索天数发送回后天，便于智能排序
      this.query_data.current_limit_days = this.$root.current_limit_days;
      // 异步更新数据
      weiboApi
          .get_weibo(this.query_data)
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            const tops = data.top;
            const hots = data.hot;
            const vips = data.vip;
            if(this.weibo_top_list.length > 10 || this.weibo_top_list.length == 0){
              for (let i = 0; i < tops.length; i++) {
                this.weibo_top_list.push(tops[i]);
              }
            }
            for (let j = 0; j < hots.length; j++) {
              this.weibo_hot_list.push(hots[j]);
            }
            for (let j = 0; j < vips.length; j++) {
              this.weibo_vip_list.push(vips[j]);
            }
            //将offset +1
            this.query_data.offset = this.query_data.offset + 1;
            this.loading = false;
            // // 加载状态结束
            // this.loading = false;
            // // 数据全部加载完成
            if (hots.length == 0) {
              this.finished = true;
            }
          })
    }
  },
  watch: {
    '$root.current_limit_days': {
      handler() {
        this.weibo_top_list = [];
        this.weibo_hot_list = [];
        this.loading = false;
        this.finished = false;
        this.query_data = {
          limit: 10,
          offset: 0,
          time_limit: 0,
          order_by: 'hot_num',
          order_sort: 'desc'
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
  font-size: 20px;
  color: #c41225;
}

.weibo-img {
  height: 30px;
  width: 30px;
}

.left-icon {
  height: 12px;
  width: 12px;
  margin-top: 10px;
  margin-right: 2px;
}


</style>