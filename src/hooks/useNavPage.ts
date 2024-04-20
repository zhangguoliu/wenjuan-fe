/*
 * @Author: zgl
 * @Description: TODO
 */
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { isNoNeedUseInfo } from '../router/index'
import { LOGIN_PATHNAME } from '../router/index'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()

  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    // // 已经登录了且想要访问登录注册页面
    // if (username && isLoginOrRegister(pathname)) {
    //   // nav(MANAGE_LIST_PATHNAME)
    // }

    // 未登录
    if (!isNoNeedUseInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
