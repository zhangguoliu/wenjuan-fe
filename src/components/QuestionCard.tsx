/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, message, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import styles from './QuestionCard.module.scss'
import { useRequest } from 'ahooks'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props

  const nav = useNavigate()

  // 更新标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('成功')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      return duplicateQuestionService(_id)
    },
    {
      manual: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess(res) {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`)
      },
    }
  )

  // 删除
  const [isDeleted, setIsDeleted] = useState(false)
  const { loading: delLoading, run: delQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeleted(true)
      },
    }
  )

  function del() {
    Modal.confirm({
      title: '确定删除该问卷？',
      okText: '确定',
      cancelText: '取消',
      onOk: delQuestion,
    })
  }

  if (isDeleted) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space size="middle">
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                nav(`/question/edit/${_id}`)
              }}
            >
              问卷编辑
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              disabled={!isPublished}
              onClick={() => {
                nav(`/question/stat/${_id}`)
              }}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            {' '}
            <Button
              type="text"
              size="small"
              icon={isStarState ? <StarFilled /> : <StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              onConfirm={duplicate}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={delLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
