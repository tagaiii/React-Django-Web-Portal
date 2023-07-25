import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {

  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className='text-white'>{userInfo?.email}</div>
  )
}

export default ProfilePage