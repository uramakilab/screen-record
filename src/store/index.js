import Vue from 'vue'
import Vuex from 'vuex'
import database from '@/store/modules/database' 
import mediaRecords from '@/store/modules/mediaRecords'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    database,
    mediaRecords
  }
})
