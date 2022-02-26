import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
import router from './router'
import store from './store'
import hyRequest from './service'
import 'normalize.css'
import './assets/css/index.less'
import * as ElIconModules from '@element-plus/icons'
import { setupStore } from './store'

const app = createApp(App)
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
app.use(globalRegister)
app.use(store)
app.use(router)
setupStore()
app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// hyRequest.get<DataType>({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: true
// })
