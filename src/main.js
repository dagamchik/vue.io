import Vue from 'vue';
import App from './App.vue';

import { text, name } from './script';
import forAlertFunc from './secondScript';

forAlertFunc('Hello');

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alert(text + name);
