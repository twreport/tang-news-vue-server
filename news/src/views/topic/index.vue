<template>
<div>
  <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="load_msg"
      @load="onLoad"
  ><van-cell-group
      v-for="item in topic_list"
      :key="item"
  >
    <van-cell :title="item.topic_title" :label="item.brief" :size="large" :border="false" :url="item.url" title-class="topic-title">
    <template #right-icon>
      <img  v-if="item.is_img" :src="item.img_url" class="topic-img"/>
    </template>

      <template #label>
        <van-collapse v-model="activeNames">
        <div class="img-3-div" v-if="item.is_img_3">
          <img v-for="img_item in item.img_url" v-bind:key="img_item" :src="img_item" class="img-3"/>
        </div>
        <div v-if="!item.is_img_3">{{item.brief}}</div>
          <div class="topic-foot">本话题共有 <b class="item-b">{{item.topic_article_num}}</b> 个信息源关注</div>
          <div class="topic-foot">总热度：{{item.topic_hot_num}} </div>
          <van-collapse-item title="点击查看全部相关文章" :name="item.id">
            <div v-for="topic_item in item.json_items" :key="topic_item" class="topic-info"><img class="img-item" :src="topic_item.logo"/><a class="item-a" :href="topic_item.url">{{topic_item.title}}</a></div>
          </van-collapse-item>
        </van-collapse>





      </template>
    </van-cell>

  </van-cell-group>

  </van-list>
</div>
</template>

<script>
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import topicApi from "@/api/topic.js";
export default {
  name: "topic",
  data() {
    return {
      activeNames: ['1'],
      topic_list: [],
      loading: false,
      finished: false,
      query_data: {
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'topic_hot_num',
        order_sort: 'desc',
        mode: 1
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
      console.log(this.query_data.time_limit);
      // 将搜索天数发送回后天，便于智能排序
      this.query_data.current_limit_days = this.$root.current_limit_days;
      // 异步更新数据
      topicApi
          .get_topic(this.query_data)
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            for (let i = 0; i < data.length; i++) {
              this.topic_list.push(data[i]);
            }
            //将offset +1
            this.query_data.offset = this.query_data.offset + 1;
            this.loading = false;
            // // 加载状态结束
            // this.loading = false;
            // // 数据全部加载完成
            if (this.topic_list.length >= 100 || res.data.length == 0) {
              this.finished = true;
            }
          })
    }
  },
  watch: {
    '$root.current_limit_days': {
      handler() {
        this.topic_list = [];
        this.loading = false;
        this.finished = false;
        this.query_data = {
          limit: 10,
          offset: 0,
          time_limit: 0,
          order_by: 'topic_hot_num',
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
    vanCellGroup: CellGroup,
    vanCollapse: Collapse,
    vanCollapseItem: CollapseItem
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

.topic-title{
  margin-top: 5px;
  font-size: 20px;
}

.topic-foot{
  /* margin-left: 16px; */
  font-size: 14px;
  color: rgb(50, 50, 50);
}

.img-item{
  height: 14px;
  width: 14px;
}

.item-b{
  font-size: larger;
  font-family: Arial, Helvetica, sans-serif;
  color: brown;
}

.item-a{
  color:darkgrey;
}
</style>