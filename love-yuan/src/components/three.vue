<template>
  <div class="three" >
    <template>
      <p>华益峰💗袁媛</p>
      <p>已经在一起了</p>
      <p>❤️❤️❤️❤️❤️❤️💗❤️❤️❤️❤️❤️❤️</p>
      <p>{{countdownDetail.y}}年</p>
      <p>{{countdownDetail.m}}月</p>
      <p>{{countdownDetail.d}}日</p>
      <p>{{countdownDetail.h}}时</p>
      <p>{{countdownDetail.min}}分</p>
      <p>{{countdownDetail.s}}秒</p>
    </template>
  </div>
</template>

<script>

export default {
  mounted() {
    setInterval(() => {
      this.countdown = Date.now().valueOf() - localStorage.getItem('love_now')
    }, 1000)
  },
  data() {
    return {
      countdown: 0,
    }
  },
  computed: {
    countdownDetail() {
      let ct = this.countdown
      let y = 0,m = 0,d = 0,h = 0,min = 0,s = 0
      if(ct/1000/60/60/24/30/12 > 1) {
        y = Math.floor(ct/1000/60/60/24/30/12)
        ct = ct - (y * 1000 * 60 * 60 * 24 *30 * 12)
      }
      if(ct/1000/60/60/24/30 > 1) {
        m = Math.floor(ct/1000/60/60/24/30)
        ct = ct - (m * 1000 * 60 * 60 * 24 *30)
      }
      if(ct/1000/60/60/24 > 1) {
        d = Math.floor(ct/1000/60/60/24)
        ct = ct - (d * 1000 * 60 * 60 * 24)
      }
      if(ct/1000/60/60 > 1) {
        h = Math.floor(ct/1000/60/60)
        ct = ct - (h * 1000 * 60 * 60)
      }
      if(ct/1000/60 > 1) {
        min = Math.floor(ct/1000/60)
        ct = ct - (min * 1000 * 60)
      }
      if(ct/1000 > 1) {
        s = Math.floor(ct/1000)
        ct = ct - (s * 1000)
      }
      return { y,m,d,h,min,s }
    }
  }
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
.three {
  background-color: #f9f1ff;
  height: 100%;
  margin-top: -18px;
  position: relative;
}
.three p:nth-child(1) {
  padding-top: 120px;
}

.three p {
  margin-top: 20px;
}

.three button {
  position: absolute;
  font-size: 20px;
  background-color: #fff;
}

</style>
