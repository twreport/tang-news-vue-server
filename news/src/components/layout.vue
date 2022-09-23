<template>
  <div>
    <app-header />
    <app-main />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";
export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppMain
  }
};
</script>