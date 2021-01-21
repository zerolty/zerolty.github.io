<template>
  <div class="one">
    <p v-for="text in texts" :key="text">
      {{text}}
    </p>
    <p v-if="arr.length === 0" class="next">
      <van-icon name="arrow-down" />
    </p>
  </div>
</template>

<script>

export default {
  mounted() {
    setInterval(() => {
      const item = this.arr.shift();
      if(item)this.texts.push(item);
    }, 1000)
  },
  data() {
    const date = new Date()
    return {
      arr: [
        '圆圆',
        '❄️',
        '我有话想对你说',
        '🌹',
        '遇见你我真的非常开心',
        '😄',
        `今天是${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        '📅',
        '这本来是一个一点都不特别的日子',
        "🍥",
        '但是接下来发生的事可能会让今天变得有点特别',
        '❓',
        '如果你猜今天貌似有点不一样特别而且对我有感觉 就请下滑',
        '...'
        
      ],
      texts: []
    }
  },

  
}
</script>

<style>
@keyframes dance {
    0% {
        transform: scale(1.0);
    }
    100% {
        transform: scale(2.0);
    }
}
.one {
  background-color: #f9f1ff;
  height: 100%;
  margin-top: -18px;
}
.one p:nth-child(1) {
  padding-top: 120px;
}

.one p {
  margin-top: 20px;
}
.one .next {
  font-size: 40px;
  position: absolute;
  left: 48%;
  bottom: 100px;
  animation: leaves 5s ease-in-out infinite alternate;
  -webkit-animation: dance .5s infinite alternate;

}

</style>
