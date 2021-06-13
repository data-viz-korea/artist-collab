<template>
  <data-viz-main />
</template>

<script>
import "@/assets/global.scss";
import DataVizMain from "./components/dataVizPane/DataVizMain.vue";

export default {
  name: "App",
  components: {
    DataVizMain,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
