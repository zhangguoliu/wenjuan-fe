/*
 * @Author: zgl
 * @Description: 问卷的段落组件
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph', // type 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
