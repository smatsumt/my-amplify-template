import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { components } from 'aws-amplify-vue';

Vue.config.productionTip = false

Amplify.configure(aws_exports)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  components: {
    App,
    ...components
  }
}).$mount('#app')
