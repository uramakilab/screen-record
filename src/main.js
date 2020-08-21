import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import vuetify from './plugins/vuetify';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  storageBucket: process.env.STORAGE_BUCKET,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
}

firebase.initializeApp(firebaseConfig)
// var storage = firebase.storage()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
