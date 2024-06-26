import React from 'react'
import './Follower.scss'
import Avatar from '../avatar/Avatar'

const Follower = () => {
  return (
    <div className='follower'>
        <div className='user-info'>
        <Avatar />
        <h4 className='name'>Robin</h4>
        </div>
        <h5 className='follow-links'>Follow</h5>
    </div>
  )
}

export default Follower