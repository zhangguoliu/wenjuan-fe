/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '../router/index'

const Logo: FC = () => {
  const { Title } = Typography

  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) setPathname(MANAGE_LIST_PATHNAME)
  }, [username])

  return (
    <Link to={pathname}>
      {' '}
      <Space className={styles.container}>
        <Title>
          <FormOutlined />
        </Title>
        <Title>小科问卷</Title>
      </Space>
    </Link>
  )
}

export default Logo
