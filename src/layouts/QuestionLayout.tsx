/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
// import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  // 加载用户信息
  const waitingUserData = useLoadUserData()
  // useNavPage(waitingUserData)

  return (
    <div style={{ height: '100vh' }}>
      {!waitingUserData ? (
        <Outlet />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
    </div>
  )
}

export default QuestionLayout
