// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'lib-flexible/flexible.js'
import { Swipe, SwipeItem, Icon, Button} from 'vant'

import App from './App'
import './reset.css';


Vue.config.productionTip = false


Vue.use(Swipe).use(SwipeItem).use(Icon).use(Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
