import Vue from 'vue'
import VueRouter from 'vue-router'
import Baidu from '../views/baidu/index.vue'
import Douyin from '../views/douyin/index.vue'
import Recommend from '../views/recommend/index.vue'
import Topic from '../views/topic/index.vue'
import Toutiao from '../views/toutiao/index.vue'
import Sina from '../views/sina/index.vue'
import Tencent from '../views/tencent/index.vue'
import Netease from '../views/netease/index.vue'
import Tianyan from '../views/tianyan/index.vue'
import Weibo from '../views/weibo/index.vue'
import Weixin from '../views/weixin/index.vue'
import Search from '../views/search/index.vue'
import Result from '../views/result/index.vue'
import Layout from "@/components/layout"


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    meta: {
      title: "TANG NEWS"
    },
    redirect: "/recommend",
    component: Layout,
    children: [
      {
        path: "/baidu",
        component: Baidu
      },
      {
        path: "/douyin",
        component: Douyin
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/topic",
        component: Topic
      },
      {
        path: "/toutiao",
        component: Toutiao
      },
      {
        path: "/tencent",
        component: Tencent
      },
      {
        path: "/netease",
        component: Netease
      },
      {
        path: "/sina",
        component: Sina
      },
      {
        path: "/Tianyan",
        component: Tianyan
      },
      {
        path: "/weibo",
        component: Weibo
      },
      {
        path: "/weixin",
        component: Weixin
      },
      {
        path: "/search",
        component: Search
      },
      {
        path: "/result/:search_word",
        component: Result
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
