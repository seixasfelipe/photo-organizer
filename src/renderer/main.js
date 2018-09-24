import Vue from 'vue';
import App from './App.vue';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
});
