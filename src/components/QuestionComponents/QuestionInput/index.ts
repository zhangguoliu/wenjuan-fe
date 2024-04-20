/*
 * @Author: zgl
 * @Description: TODO 问卷的输入框
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput', // type 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionInputDefaultProps,
}
