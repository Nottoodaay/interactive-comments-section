import React from 'react'

import { Reply } from '../App'

interface ReplyProps{
    reply: Reply
    onDelete: (commentId: number | string, replyId: number | string) => void;

    commentId: number | string
}

export const Replies = ({reply, onDelete, commentId}:ReplyProps) => {
  return (
    <div>
         {
        reply.user.username === 'juliusomo' ?
                <div key={reply.id} className=' w-[344px] h-[256px] flex flex-col ml-6 bg-[#FFFFFF]' >
                <div className='flex gap-4 p-4'>
                    <img src={reply.user.image.webp} alt="userImg" className=' w-[32px] h-[32px]'/>
                    <div>{reply.user.username}</div>
                    <div>{reply.createdAt}</div>
                </div>

                <div className=' p-4'>{`@${reply.replyingTo} ${reply.content}`}</div>

                <div>
                    <div onClick={() => onDelete(commentId, reply.id)}>Delete</div>
                    <div onClick={() => '' }>Edit</div>
                </div>
                </div>
            : 
                <div key={reply.id} className=' w-[344px] h-[256px] flex flex-col ml-6 bg-[#FFFFFF]' >
                <div className='flex gap-4 p-4'>
                    <img src={reply.user.image.webp} alt="userImg" className=' w-[32px] h-[32px]'/>
                    <div>{reply.user.username}</div>
                    <div>{reply.createdAt}</div>
                </div>
                
                <div className=' p-4'>{`@${reply.replyingTo} ${reply.content}`}</div>
                </div>
            }
    </div>
  )
}
