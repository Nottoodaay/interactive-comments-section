import React from 'react'
import { useState } from 'react';

import { Reply, User, ReplyProperties } from '../App';

import imageAmrobson from '../../public/images/avatars/image-amyrobson.webp'
import imageJuiliusomo from '../../public/images/avatars/image-juliusomo.webp'
import imageMaxblagun from '../../public/images/avatars/image-maxblagun.webp'


interface CommentProps {
    comment:{ 
        id: number | string;
        content: string;
        createdAt: string;
        replies: Reply[];
        score: number;
        user: User;
    },
    onDelete: (commentId: number | string) => void;
    setNewComment: (value: string) => void,
    setReplyProperties: React.Dispatch<React.SetStateAction<ReplyProperties | null>>,
    onUpdate: (commentId: number | string, updatedComment: string) => void
}


export const Comment: React.FC<CommentProps> = ({comment, onDelete, setNewComment, setReplyProperties, onUpdate }) => {

  const [edit, setEdit] = useState<boolean>(false)
  const [textAfterEdit, setTextAfterEdit] = useState<string>(comment.content)

  const images = [imageJuiliusomo ,imageAmrobson, imageMaxblagun]

  const handleReply = (commentId: number | string, replyingTo: string) => {
    setNewComment(`@${replyingTo} `)
    setReplyProperties({id: commentId, replyingTo: replyingTo})
  };

  const handleUpdate = () =>{
    onUpdate(comment.id, textAfterEdit)
    setEdit(false)
  }
  
  return (
    comment.user.username === 'juliusomo' ? 
        <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
            <div className=' flex gap-4 p-4'>
            <img src={imageJuiliusomo} className=' w-[32px] h-[32px]' alt="UserImg" />
            <div>{comment.user.username}</div>
            <div>{comment.createdAt}</div>
            </div>
            {edit ? 
            <>
              <textarea rows={4} cols={50} 
              value={textAfterEdit}
              onChange={(e)=>setTextAfterEdit(e.target.value)}>{comment.content}</textarea>
              
              <button className=' w-[104px] h-[48px] 
              bg-[#5357B6] items-center 
              font-medium text-base text-[#ffffff] rounded'
              onClick={()=>handleUpdate()}
              >UPDATE</button>
            </>

            :  
            <div className=' text-base text-[#67727E] p-4'>{comment.content}</div>
            }
            <div>
                <div onClick={() => onDelete(comment.id)}>Delete</div>
                <div onClick={() => setEdit(!edit) }>Edit</div>
            </div>
        </div> 
       : 
       <div className='flex flex-col gap-4 items-center'>
            <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
              <div className=' flex gap-4 p-4'>
                <img src={typeof comment.id === 'number' ? images[comment.id] : ''} className=' w-[32px] h-[32px]' alt="UserImg" />
                <div>{comment.user.username}</div>
                <div>{comment.createdAt}</div>
              </div>
                
                <div className=' text-base text-[#67727E] p-4'>{comment.content}</div>
                <div 
                  onClick={() => 
                  handleReply(comment.id, comment.user.username)}
                  className=' cursor-pointer text-base text-[#5357B6] font-medium'
                  >Reply</div>
             </div>
        </div>
  )
}
