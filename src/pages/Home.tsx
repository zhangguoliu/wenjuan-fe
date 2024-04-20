/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router'
import { useTitle } from 'ahooks'
import styles from './Home.module.scss'
// import axios from 'axios'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
    // axios.get('/api/test').then(res => console.log(res.data))
  }, [])

  useTitle('小科问卷 - 首页')

  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>小科问卷 | 在线调查</Title>
        <Paragraph>已累计创建问卷 1090 份，发布问卷 100 份，收到答卷 10000 份</Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_LIST_PATHNAME)
            }}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
