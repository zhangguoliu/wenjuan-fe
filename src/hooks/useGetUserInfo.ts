/*
 * @Author: zgl
 * @Description: TODO
 */
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
  const { username } = useSelector<StateType>(state => state.user) as UserStateType
  return { username }
}

export default useGetUserInfo
