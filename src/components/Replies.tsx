import { Reply } from '../App'
import { useState } from 'react';

import imageRamsesmiron from '../../public/images/avatars/image-ramsesmiron.webp'
import imageJuiliusomo from '../../public/images/avatars/image-juliusomo.webp'

interface ReplyProps{
    reply: Reply
    onDelete: (commentId: number | string, replyId: number | string) => void;
    commentId: number | string,
    onUpdate: (replyId: number | string, updatedReply: string) => void,
    setDeleteReplyCheck: (value: boolean) => void,
    setDeleteCommentId: (value: string | number) => void,
    setDeleteReplyId: (value: string | number) => void
}

export const Replies = ({
    reply, 
    onDelete, 
    commentId, 
    onUpdate, 
    setDeleteReplyCheck,
    setDeleteCommentId,
    setDeleteReplyId
}:ReplyProps) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [replyText, setReplyText] = useState<string>(reply.content)

    const handleUpdate = () =>{
        onUpdate(reply.id, replyText)
        setEdit(!edit)
    }

    const handleDeleteReply = (id: string | number) =>{
        setDeleteReplyCheck(true)
        setDeleteCommentId(commentId)
        setDeleteReplyId(id)
    }

  return (
    <div>
         {
        reply.user.username === 'juliusomo' ?
                <div key={reply.id} className=' w-[344px] h-[256px] flex flex-col ml-6 bg-[#FFFFFF]' >
                <div className='flex gap-4 p-4'>
                    <img src={imageJuiliusomo} alt="userImg" className=' w-[32px] h-[32px]'/>
                    <div>{reply.user.username}</div>
                    <div>{reply.createdAt}</div>
                </div>

                {edit ?
                    <>
                        <textarea rows={4} cols={50}
                        value={replyText} 
                        onChange={(e)=>setReplyText(e.target.value)}
                         >{reply.content}</textarea>
                        
                        <button className=' w-[104px] h-[48px] 
                        bg-[#5357B6] items-center 
                        font-medium text-base text-[#ffffff] rounded'
                        onClick={handleUpdate}
                        >UPDATE</button>
                    </> 
                    : 
                    <div className=' p-4'>{`@${reply.replyingTo} ${reply.content}`}</div> 
                }

                <div>
                    <div onClick={() => handleDeleteReply(reply.id)}>Delete</div>
                    <div onClick={() => setEdit(!edit) }>Edit</div>
                </div>
                </div>
            : 
                <div key={reply.id} className=' w-[344px] h-[256px] flex flex-col ml-6 bg-[#FFFFFF]' >
                <div className='flex gap-4 p-4'>
                    <img src={imageRamsesmiron} alt="userImg" className=' w-[32px] h-[32px]'/>
                    <div>{reply.user.username}</div>
                    <div>{reply.createdAt}</div>
                </div>
                
                <div className=' p-4'>{`@${reply.replyingTo} ${reply.content}`}</div>
                </div>
            }
    </div>
  )
}
