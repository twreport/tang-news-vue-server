<template>
  <van-sticky>
    <van-search v-model="value" :background="$root.search_background_color" shape="round" show-action
                :placeholder="hold_word" clearable
                @focus="search_foucs" @input="input_search">
      <template #left v-if="this.$root.is_search">
        <div @click="cancel_search">
          <van-icon name="arrow-left" class="left-arrow-icon"/>
        </div>
      </template>
      <template #action>
        <div class="right-logo-container">
          <img :src="$root.logo_url" class="tang-img" @click="click_logo"/>
          <p class="days">{{ $root.current_limit_days }}</p>
        </div>
      </template>
    </van-search>

    <van-tabs v-if="!this.$root.is_search" v-model="activeName" class="main_tabs" :sticky="true"
              :before-change="beforeChange">
      <van-tab title="话题" name="topic" to="/topic"></van-tab>
      <van-tab title="推荐" name="recommend" to="/recommend"></van-tab>
      <van-tab title="微信" name="weixin" to="/weixin"></van-tab>
      <van-tab title="微博" name="weibo" to="/weibo"></van-tab>
      <van-tab title="新浪" name="sina" to="/sina"></van-tab>
      <van-tab title="天眼" name="tianyan" to="/tianyan"></van-tab>
      <van-tab title="头条" name="toutiao" to="/toutiao"></van-tab>
      <van-tab title="百度" name="baidu" to="/baidu"></van-tab>
      <van-tab title="抖音" name="douyin" to="/douyin"></van-tab>
      <van-tab title="腾讯" name="tencent" to="/tencent"></van-tab>
      <van-tab title="网易" name="netease" to="/netease"></van-tab>

    </van-tabs>
  </van-sticky>
</template>

<script>
import {Search} from 'vant';
import {Tab, Tabs} from 'vant';
import {Icon} from 'vant';
import {Sticky} from 'vant';
import {Notify} from 'vant';

export default {
  data() {
    // 如果页面是直接返回/result,需要对初始数据进行更正
    console.log(this.$route.path);
    let search_word = '';
    if(this.$route.path.indexOf("/result") != -1){
      this.$root.is_search = true;
      this.$root.is_in_search_result = true;
      this.$root.search_background_color = "#dcdee0";
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_black.png";
      const raw = this.$route.params.search_word;
      search_word = decodeURI(raw);
    }
    let activeName = this.$route.path.slice(1);
    return {
      value: search_word,
      activeName: activeName,
      hold_word: '请输入搜索关键词',
      show_days: this.$root.current_limit_days
    }
  },
  components: {
    vanSearch: Search,
    vanTab: Tab,
    vanTabs: Tabs,
    vanIcon: Icon,
    vanSticky: Sticky
  },
  mounted() {
    console.log('mounted!')
  },
  methods: {
    search_foucs() {
      console.log('focus!');
      if (this.$route.path != '/search' && this.$route.path.indexOf('/result') != -1) {
        this.$root.last_path = this.$route.path;
      }
      this.$root.search_word = '';
      this.hold_word = '';
      this.$root.is_search = true;
      this.$root.is_in_search_result = false
      this.$root.search_background_color = "#dcdee0";
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_search.png";
      this.$router.push('/search');
    },
    clear(){
      console.log('clear');
      this.value = '';
      this.$root.search_word = '';
    },
    cancel_search() {
      console.log('cancel!');
      this.value = '';
      this.hold_word = '请输入搜索关键词';
      this.$root.search_word = '';
      this.$root.is_search = false;
      this.$root.is_in_search_result = false;
      this.$root.search_background_color = "#ee0a24";
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word.png";
      //将搜索类型复位
      this.$root.search_type = 'default';
      this.$router.push('/recommend');
    },
    input_search(value) {
      console.log('input!');
      console.log(value);
      //将搜索类型复位
      this.$root.search_type = 'default';
      this.$root.search_word = value;
      this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_search.png";
    },
    click_logo() {
      if (this.$root.is_search == true && this.$root.is_in_search_result == false) {
        this.go_search();
      } else {
        this.change_limit_days();
      }
    },
    go_search() {
      console.log('search!');
      if (this.$root.search_word != '' && this.value != '请输入搜索关键词') {
        this.$root.is_in_search_result = true;
        this.$root.logo_url = "https://tangwei.cc/imgs/logo_word_black.png";
        console.log(encodeURIComponent(this.$root.search_word))
        const url = "/result/" + encodeURIComponent(this.$root.search_word);
        this.$router.push(url);
      } else {
        Notify('您还没有填写搜索关键词哦：）');
      }
    },
    change_limit_days() {
      console.log('change limit days!');
      const new_limit_days = this.GLOBAL.change_limit_day(this.$root.current_limit_days);
      this.$root.current_limit_days = new_limit_days;
    },
    beforeChange() {
      const current_path = this.$route.path;
      console.log(current_path);
      this.$root.last_path = current_path;
      return true;
    }
  },
  watch: {
    '$root.search_word': {
      handler() {
        this.value = this.$root.search_word;
        this.hold_word = this.$root.search_word;
      }
    },
    '$route.path': {
      handler() {
        console.log('watch!');
        console.log(this.$route.path);
        this.activeName = this.$route.path.slice(1);
      }
    }
  }
}
</script>

<style scoped>
.tang-logo {
  color: rgb(216, 216, 216);
  font-size: 18px;
}

.tang-img {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
  height: 40px;
  width: 40px;
}

.left-arrow-icon {
  font-size: 20px;
  /* font-weight: bold; */
  /* color:whitesmoke; */
  margin-right: 10px;
}

.right-logo-container {
  position: relative;
}

.days {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  /*font-style: italic;*/
  font-weight: 1000;
  text-shadow: 2px 2px 2px black;
  color: orange;
  position: absolute;
  right: 6px;
  bottom: 12px;
}
</style>