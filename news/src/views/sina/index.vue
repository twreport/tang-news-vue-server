<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="load_msg"
        @load="onLoad"
    >
      <van-cell-group
          v-for="item in sina_top_list"
          :key="item"
      >
        <van-cell :title="item.title" size="large" :url="item.url"  :border="false" title-class="sina-top-title">
          <template #label>
            <div v-if="item.is_brief">新浪热度：{{ item.hotValue }}</div>
          </template>
        </van-cell>

      </van-cell-group>

      <van-cell-group
          v-for="item in sina_hot_list"
          :key="item"
      >
        <van-cell :title="item.title" size="large" :url="item.url"  :border="false" title-class="sina-title">
          <template #label>
            <div>新浪热度：{{ item.hotValue }}</div>
          </template>
        </van-cell>
      </van-cell-group>

    </van-list>
  </div>
</template>

<script>
import {List} from 'vant';
import {Cell, CellGroup} from 'vant';
import sinaApi from "@/api/sina.js";

export default {
  name: "sina",
  data() {
    return {
      sina_top_list: [],
      sina_hot_list: [],
      loading: false,
      finished: false,
      query_data: {
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'hotValue',
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
      // 将搜索天数发送回后台，便于智能排序
      this.query_data.current_limit_days = this.$root.current_limit_days;
      // 异步更新数据
      sinaApi
          .get_sina(this.query_data)
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            const tops = data.top;
            const hots = data.hot;
            if(this.sina_top_list.length > 10 || this.sina_top_list.length == 0){
              for (let i = 0; i < tops.length; i++) {
                this.sina_top_list.push(tops[i]);
              }
            }
            for (let j = 0; j < hots.length; j++) {
              this.sina_hot_list.push(hots[j]);
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
        this.sina_top_list = [];
        this.sina_hot_list = [];
        this.loading = false;
        this.finished = false;
        this.query_data = {
          limit: 10,
          offset: 0,
          time_limit: 0,
          order_by: 'hotValue',
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
  font-weight: bolder;
  font-size: 20px;
  color: #c41225;
}

.sina-img {
  height: 30px;
  width: 30px;
}

</style>