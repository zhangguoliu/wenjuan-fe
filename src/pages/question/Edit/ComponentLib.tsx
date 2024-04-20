/*
 * @Author: zgl
 * @Description: TODO
 */
import React, { FC } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

const Lib: FC = () => {
  function genComponent(c: ComponentConfType) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, type, Component, defaultProps } = c
    const dispatch = useDispatch()

    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: defaultProps,
        })
      )
    }

    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }

  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
