<template>
  <van-row>
    <van-col span='11' offset='1'>Hello</van-col>
    <van-col span='11'>Vant</van-col>
    <van-button type="warning">警告按钮</van-button>
  </van-row>
</template>

<script>
import {Row, Col, Button} from 'vant';
export default {
  name: 'About',
  components: {
    vanRow: Row,
    vanCol: Col,
    vanButton: Button
  }
}

</script>