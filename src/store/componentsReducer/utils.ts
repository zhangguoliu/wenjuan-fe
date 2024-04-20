/*
 * @Author: zgl
 * @Description: TODO 删除当前组件之前，计算下一个 selectedId
 */
import { ComponentInfoType, ComponentsStateType } from './index'

export function getNextSelectedId(id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)

  const index = visibleComponentList.findIndex(c => c.fe_id === id)
  if (index < 0) return ''

  let newSelectId = ''
  const length = visibleComponentList.length
  if (length > 1) {
    if (index + 1 === length) newSelectId = visibleComponentList[index - 1].fe_id
    else newSelectId = visibleComponentList[index + 1].fe_id
  }

  return newSelectId
}

export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex(c => c.fe_id === selectedId)
  if (index < 0) {
    // 未选中任何组件
    state.componentList.push(newComponent)
  } else {
    // 选中了组件：插入到 index 后面
    state.componentList.splice(index + 1, 0, newComponent)
  }

  state.selectedId = newComponent.fe_id
}
