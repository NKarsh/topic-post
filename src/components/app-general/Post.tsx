import { Post as PostInterface } from '@/types'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import React from 'react'

const Post = ({
    post,
    index
}:{
    post:PostInterface,
    index:number
}) => {
  return (
    <motion.div 
        id={`${index}`} 
        className='bg-white rounded-lg p-4'
        whileHover={{scale:1.05}}
    >
        <div>
            {post.title}
        </div>
        <div>
            {post.content}
        </div>
        <div className='flex'>
            <HeartHandshake/>
            {post.applause}
        </div>
    </motion.div>
  )
}

export default Post