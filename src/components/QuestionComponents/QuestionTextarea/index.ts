/*
 * @Author: zgl
 * @Description:
 */
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '多行输入',
  type: 'questionTextarea', // type 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
}
