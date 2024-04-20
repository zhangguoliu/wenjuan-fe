/*
 * @Author: zgl
 * @Description: TODO
 */
import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer from './userReducer'
import { UserStateType } from './userReducer'
import componentsReducer from './componentsReducer'
import { ComponentsStateType } from './componentsReducer'
import PageInfoReducer, { PageInfoType } from './PageInfoReducer'

export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,

    // 没有 undo
    // components: componentsReducer,

    // 增加 undo
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    // 页面信息
    pageInfo: PageInfoReducer,
  },
})
