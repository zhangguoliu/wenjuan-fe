/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEYWORD } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchVal, setSearchVal] = useState('')
  const [searchParam] = useSearchParams()

  useEffect(() => {
    const curVal = searchParam.get(LIST_SEARCH_PARAM_KEYWORD) || ''
    setSearchVal(curVal)
  }, [searchParam])

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEYWORD}=${value}`,
    })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchVal(event.target.value)
  }

  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        onSearch={handleSearch}
        style={{ width: 200 }}
        value={searchVal}
        onChange={handleChange}
      />
    </>
  )
}

export default ListSearch
