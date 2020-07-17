<template>
  <div class="two">
    <p>不断点击这个小爱心 你即将拥有好运</p>
    <p class="lover" @click="add">💗</p>
    <p v-for="(text, idx) in texts" :key="text">
      <template v-if="idx === 1">
        <div>
          <img
            class="avatar"
            src="https://s3.qiufengh.com/love/WechatIMG931.jpeg"
            alt=""
          />
          ❤️ ❤️ ❤️ 💗 ❤️ ❤️ ❤️
          <img
            class="avatar"
            src="https://s3.qiufengh.com/love/WechatIMG930.jpeg"
            alt=""
          />
        </div>
      </template>
      <template v-if="idx === 3">
        <div>
          <img class="photo" src="" alt="" />
        </div>
      </template>
      <template v-if="idx === 4">
        <div>
          <img class="photo" src="" alt="" />
        </div>
      </template>
      {{ text }}
    </p>

    <p v-if="arr.length === 0" class="next">
      <van-icon name="arrow-down" />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    const date = new Date();
    return {
      arr: [
        "唔，也许一开始我们可能有点被外貌协会收编了",
        "😆",
        "但是后来我看到了小圆的温柔，小圆看到了我的才华",
        "🎻",
        "本来一个月前应该见面的我们，因为疫情",
        "👫",
        "我们被迫当了整整两个月的网友",
        "😅",
        "终于见面了，小圆依旧是如此美丽温柔（10级滤镜加上）",
        "🌼",
        "还记得我们每次说话都是那么的默契",
        "👇",
        "你想我的时候我正想你",
        "😋",
        "那么以后我负责帅气你负责美丽，怎么样❓",
        "💓",
        "请继续往下滑。",
      ],
      texts: [],
    };
  },
  methods: {
    add() {
      const item = this.arr.shift();
      if (item) this.texts.push(item);
    },
  },
};
</script>

<style>
@keyframes dance {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}
.two {
  background-color: #daf6ff;
  height: 100%;
  margin-top: -18px;
}
.two p:nth-child(1) {
  padding-top: 60px;
}

.two p {
  margin-top: 20px;
}
.two .next {
  font-size: 40px;
  position: absolute;
  left: 48%;
  bottom: 100px;
  animation: leaves 5s ease-in-out infinite alternate;
  -webkit-animation: dance 0.5s infinite alternate;
}
.two .lover {
  margin-top: 40px;
  font-size: 60px;
  cursor: pointer;
  animation: leaves 5s ease-in-out infinite alternate;
  -webkit-animation: dance 0.5s infinite alternate;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 666px;
  margin: 0 10px;
}
.photo {
  width: 200px;
  margin-bottom: 20px;
}
</style>
