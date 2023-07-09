import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Private({chidlen}) {
    const user=useSelector((state)=>state.user)
  return (
    <>
    {
     !user?(<Navigate to="/login" />):chidlen
    }
    </>
  )
}

export default Private