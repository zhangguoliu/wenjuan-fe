/*
 * @Author: zgl
 * @Description: TODO
 */
import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  // Ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username } = result
      // 存储到 Redux store
      dispatch(loginReducer({ username }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断当前 Redux store 是否已经存在用户信息
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])

  // Ajax 加载完用户信息后放到 Redux 中，返回用户状态信息即可
  return waitingUserData
}

export default useLoadUserData
