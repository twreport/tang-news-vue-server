<template>
  <van-cell-group>
    <van-cell title="按24小时热词搜索">
      <template #label>
        <!-- <div>热度：{{item.HotValue}}</div> -->
        <!-- <van-button type="default" v-for="item in area" :key="item">{{ item }}</van-button> -->
        <div @click="search_by_keywords($event)" class="search-div" v-for="keyword_item in keywords_list"
             :key="keyword_item">{{ keyword_item.word }}
        </div>
      </template>
    </van-cell>
    <van-cell title="按地区搜索">
      <template #label>
        <!-- <div>热度：{{item.HotValue}}</div> -->
        <!-- <van-button type="default" v-for="item in area" :key="item">{{ item }}</van-button> -->
        <div @click="search_by_area($event)" class="search-div" v-for="area_item in area" :key="area_item">{{
            area_item
          }}
        </div>
      </template>
    </van-cell>
    <van-cell title="按分类搜索">
      <template #label>
        <!-- <div>热度：{{item.HotValue}}</div> -->
        <!-- <van-button type="default" v-for="item in area" :key="item">{{ item }}</van-button> -->
        <div @click="search_by_sort($event)" class="search-div" v-for="sort_item in sort" :key="sort_item">{{
            sort_item
          }}
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
import searchApi from "@/api/search.js";
import {Cell, CellGroup} from 'vant';

export default {
  name: "search",
  data() {
    return {
      area: ["贵阳", "遵义", "毕节", "六盘水", "安顺", "铜仁", "黔东南", "黔南", "黔西南"],
      sort: ["突发", "经济", "社会", "法制", "疫情", "文化", "旅游", "体育", "政治"],
      search_list: [],
      keywords_list: [],
      loading: false,
      finished: false,
      query_data: {
        limit: 10,
        offset: 0,
        time_limit: 0,
        order_by: 'default',
        order_sort: 'desc',
        mode: 1
      }
    }
  },
  mounted() {
    this.init_keywords();
  },
  methods: {
    init_keywords() {
      console.log('init!');
      searchApi
          .get_keywords()
          .then(res => {
            console.log('res:', res);
            const data = res.data;
            for (let i = 0; i < data.length; i++) {
              if (i < 20) {
                this.keywords_list.push(data[i]);
              }
            }
          })
    },
    search_by_area(e) {
      console.log(e.target.innerText);
      this.$root.search_word = e.target.innerText;
      this.$root.is_in_search_result = true;
      this.$root.search_type = 'area';
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_black.png";
      const url = encodeURI("/result/" + this.$root.search_word);
      this.$router.push(url);
    },
    search_by_sort(e) {
      console.log(e.target.innerText);
      this.$root.search_word = e.target.innerText;
      this.$root.is_in_search_result = true;
      this.$root.search_type = 'sort';
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_black.png";
      const url = encodeURI("/result/" + this.$root.search_word);
      this.$router.push(url);
    },
    search_by_keywords(e) {
      console.log(e.target.innerText);
      this.$root.search_word = e.target.innerText;
      this.$root.is_in_search_result = true;
      this.$root.search_type = 'keywords';
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_black.png";
      const url = encodeURI("/result/" + this.$root.search_word);
      this.$router.push(url);
    }
  },
  components: {
    vanCell: Cell,
    vanCellGroup: CellGroup
  }
}

</script>

<style scoped>

.search-div {
  font-size: 15px;
  float: left;
  margin: 20px;
}
</style>