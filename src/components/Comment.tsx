import React from 'react'

import { Reply } from '../App';
import { User } from '../App';

interface CommentProps {
    comment:{ 
        id: number | string;
        content: string;
        createdAt: string;
        replies: Reply[];
        score: number;
        user: User;
    },
    onReply: (commentId: number | string, replyingTo: string) => void;
    onDelete: (commentId: number | string) => void;
}

export const Comment: React.FC<CommentProps> = ({comment, onReply, onDelete}) => {
  return (
    comment.user.username === 'juliusomo' ? 
        <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
            <div className=' flex gap-4 p-4'>
            <img src={comment.user.image.webp} className=' w-[32px] h-[32px]' alt="UserImg" />
            <div>{comment.user.username}</div>
            <div>{comment.createdAt}</div>
            </div>
            <div className=' text-base text-[#67727E] p-4'>{comment.content}</div>
            
            <div>
                <div onClick={() => onDelete(comment.id)}>Delete</div>
                <div onClick={() => '' }>Edit</div>
            </div>
        </div> 
       : 
       <div className='flex flex-col gap-4 items-center'>
            <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
              <div className=' flex gap-4 p-4'>
                <img src={comment.user.image.webp} className=' w-[32px] h-[32px]' alt="UserImg" />
                <div>{comment.user.username}</div>
                <div>{comment.createdAt}</div>
              </div>
                
                <div className=' text-base text-[#67727E] p-4'>{comment.content}</div>
                <div 
                  onClick={() => 
                  onReply(comment.id, comment.user.username)}
                  className=' cursor-pointer text-base text-[#5357B6] font-medium'
                  >Reply</div>
             </div>
        </div>
  )
}
