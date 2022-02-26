import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs
} from 'element-plus'
import { ElAlert } from 'element-plus/lib/components'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElAlert,
  ElAside,
  ElTabPane
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
