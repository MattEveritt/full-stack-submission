import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  if (!notifications.message) {
    return null
  }

  return (
    <div className={notifications.success ? 'success' : 'error'}>{notifications.message}</div>
  )
}

export default Notification
