<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="load_msg"
        @load="onLoad"
    >
      <van-cell-group
          v-for="item in tianyan_list"
          :key="item"
      >
        <van-cell :title="item.title" :size="large" :url="item.url" title-class="tianyan-title">
          <template #right-icon>
            <img :src="item.img" class="tianyan-img"/>
          </template>
          <template #label>
            <div>APP阅读量：{{ item.news_views }}</div>
          </template>
        </van-cell>
      </van-cell-group>

    </van-list>
  </div>
</template>

<script>
import {List} from 'vant';
import {Cell, CellGroup} from 'vant';
import tianyanApi from "@/api/tianyan.js";

export default {
  name: "tianyan",
  data() {
    return {
      tianyan_list: [],
      loading: false,
      finished: false,
      query_data: {
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'add_time',
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
      tianyanApi
          .get_tianyan(this.query_data)
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            for (let i = 0; i < data.length; i++) {
              this.tianyan_list.push(data[i]);
            }
            //将offset +1
            this.query_data.offset = this.query_data.offset + 1;
            this.loading = false;
            // // 加载状态结束
            // this.loading = false;
            // // 数据全部加载完成
            if (this.tianyan_list.length >= 100 || res.data.length == 0) {
              this.finished = true;
            }
          })
    }
  },
  watch: {
    '$root.current_limit_days': {
      handler() {
        this.tianyan_list = [];
        this.loading = false;
        this.finished = false;
        this.query_data = {
          limit: 10,
          offset: 0,
          time_limit: 0,
          order_by: 'add_time',
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

</style>