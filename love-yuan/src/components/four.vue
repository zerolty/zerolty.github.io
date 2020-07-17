<template>
  <div class="four">
    <p v-for="text in arr" :key="text">
      {{ text }}
    </p>
    <p v-if="arr.length === 0" class="next">
      <van-icon name="arrow-down" />
    </p>
    <button class="rsv btn1" @click="handleRight">💕 同意在一起</button>
    <button class="rsv btn2" @click="handleError">
      ❌ 我美丽你丑我们不一样
    </button>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    const date = new Date();
    return {
      arr: [
        "所以就在今天小华正式地向你表白",
        "👨",
        "他喜欢你",
        "🌹",
        `今天是${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        "📅",
        "这将会是一个值得纪念的日志",
        "😄",
        "圆圆小盆友，你要不要考虑和小华在一起？",
        "⭕️",
        "请选择",
      ],
      count: 0,
    };
  },
  methods: {
    handleError() {
      const btn1 = document.querySelector(".btn1");
      const btn2 = document.querySelector(".btn2");
      alert("你肯定是嫌弃我不好看, 唔，不行，这个选择我不同意，超级变变变。");
      btn2.style.display = "none";
      btn1.style.left = "40%";
    },
    handleRight() {
      this.count++;
      const btn1 = document.querySelector(".btn1");
      const leftMax = 300;
      const topMax = 600;
      if (this.count === 1) {
        alert("嘿嘿，你同意了，我怎么能这么轻易放过你，喜欢我就来追我呀。");
      } else if (this.count < 5) {
      } else if (this.count === 5) {
        alert("来追我呀，追到就是你的啦。");
      } else if (this.count < 10) {
      } else if (this.count === 10) {
        const time = Date.now();
        alert(
          `恭喜你，喜提小华一只，提货码${time}，请截图保存，此码独一无二，稍后进行兑换, 以后就要在你家蹭你的喝你的啦。`
        );
        alert(`重新刷新页面，会有惊喜哦`);
        localStorage.setItem("love_now", time);
        return;
      } else {
        return;
      }
      btn1.style.top = ~~(Math.random() * topMax) + "px";
      btn1.style.left = ~~(Math.random() * leftMax) + "px";
    },
  },
};
</script>

<style>
.four {
  background-color: #f9f1ff;
  height: 100%;
  margin-top: -18px;
}
.four button {
  position: absolute;
  top: 700px;
  background: #fff;
}
.four p:nth-child(1) {
  padding-top: 120px;
}

.four p {
  margin-top: 20px;
}
.four .btn1 {
  left: 100px;
}
.four .btn2 {
  left: 340px;
}
.rsv {
  transition: all 0.2s;
  -moz-transition: all 0.2s; /* Firefox 4 */
  -webkit-transition: all 0.2s; /* Safari 和 Chrome */
  padding: 10px 20px;
  border: 1px solid #d2d2d2;
}

.rjt {
  padding: 10px 20px;
  border: 1px solid #d2d2d2;
  top: 800px;
  left: 400px;
}
</style>
