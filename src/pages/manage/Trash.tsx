/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC, useState } from 'react'
import { Table, Typography, Empty, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import { useTitle, useRequest } from 'ahooks'
import styles from './common.module.scss'
import SearchElem from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'

const { Title } = Typography

const Trash: FC = () => {
  useTitle('小科问卷 - 回收站')

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 已选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return <>{isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}</>
      },
    },
    {
      title: '标星',
      dataIndex: 'isStar',
      render: (isStar: boolean) => {
        return (
          <>
            {isStar ? (
              <Button type="text" icon={<StarOutlined style={{ color: 'red' }} />}>
                已标星
              </Button>
            ) : (
              <Button type="text">未标星</Button>
            )}
          </>
        )
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('已彻底删除')
        refresh()
        setSelectedIds([])
      },
    }
  )

  function del() {
    Modal.confirm({
      title: `确定彻底删除选中的问卷？`,
      okText: '确定',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }

  const TableElem = (
    <>
      <Space>
        <Button onClick={recover} type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button onClick={del} danger disabled={selectedIds.length === 0}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <SearchElem />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div>
        {!loading && list.length === 0 && <Empty description="暂无" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
