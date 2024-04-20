/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router'
import { useTitle } from 'ahooks'

const NotFound: FC = () => {
  useTitle('404')

  const nav = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_LIST_PATHNAME)
          }}
        >
          返回
        </Button>
      }
    ></Result>
  )
}

export default NotFound
