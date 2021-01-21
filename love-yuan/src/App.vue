<template>
  <div id="app">
    <Three v-if="isTime"/>
    <van-swipe v-else :vertical="true" :loop="false">
      <van-swipe-item>
        <One />
        <!-- <Four /> -->
      </van-swipe-item>
      <van-swipe-item>
        <Two />
      </van-swipe-item>
      <van-swipe-item>
        <Four />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import One from "./components/one";
import Two from "./components/two";
import Three from "./components/three";
import Four from "./components/four";
export default {
  name: "App",
  components: {
    One,
    Two,
    Three,
    Four
  },
  data() {
    return {
      isTime: localStorage.getItem('love_now')
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  user-select: none;
}
html {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.van-swipe {
  height: 100%;
}
</style>
