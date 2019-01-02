import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, Alert } from './components';
import TButton from '../components';

Vue.use((Button as any));
Vue.use((Alert as any));
Vue.use((TButton as any));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
