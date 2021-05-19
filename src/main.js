import Vue from 'vue';
import App from './App.vue';

import objectData from './script';
import forAlertFunc from './secondScript';

forAlertFunc(objectData.name);
forAlertFunc(objectData.text);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
