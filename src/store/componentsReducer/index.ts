/*
 * @Author: zgl
 * @Description: TODO
 */
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
// import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from '@dnd-kit/sortable'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STAT: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
  // 其他扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STAT,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    // 修改 selectId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },

    // 添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(state, newComponent)
    },

    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const curCom = state.componentList.find(c => c.fe_id === fe_id)
      if (curCom) {
        curCom.props = {
          ...curCom.props,
          ...newProps,
        }
      }
    },

    // 删除选中的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = state

      // 计算删除后新的 selectedId
      const newSelectId = getNextSelectedId(removeId, componentList)
      state.selectedId = newSelectId

      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    },

    // 隐藏/显示组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      // 重新计算 selected_id
      let newSelectId = ''
      // 隐藏
      if (isHidden) newSelectId = getNextSelectedId(fe_id, componentList)
      // 显示
      else newSelectId = fe_id

      state.selectedId = newSelectId

      const curCom = componentList.find(c => c.fe_id === fe_id)
      if (curCom) {
        curCom.isHidden = isHidden
      }
    },

    // 锁定/解锁组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload

      const curCom = state.componentList.find(c => c.fe_id === fe_id)
      if (curCom) {
        curCom.isLocked = !curCom.isLocked
      }
    },

    // 拷贝当前选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (!selectedComponent) return
      // 深拷贝
      state.copiedComponent = cloneDeep(selectedComponent)
    },

    // 粘贴拷贝的组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state

      if (copiedComponent == null) return

      // 要把 fe_id 修改了
      copiedComponent.fe_id = nanoid()

      insertNewComponent(state, copiedComponent)
    },

    // 选中上一个
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) return
      if (index <= 0) return
      state.selectedId = componentList[index - 1].fe_id
    },

    // 选中下一个
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) return
      if (index + 1 === componentList.length) return
      state.selectedId = componentList[index + 1].fe_id
    },

    // 修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { title, fe_id } = action.payload
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) curComp.title = title
    },

    // 移动组件位置
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
