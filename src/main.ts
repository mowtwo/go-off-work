import App from './App.svelte'
import 'virtual:windi.css'
import "dayjs/locale/zh-cn"

const app = new App({
  target: document.getElementById('app')
})

export default app
