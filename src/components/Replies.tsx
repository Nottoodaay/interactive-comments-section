import { Reply } from '../App'
import { useState } from 'react';

interface ReplyProps{
    reply: Reply
    onDelete: (commentId: number | string, replyId: number | string) => void;
    commentId: number | string,
    onUpdate: (replyId: number | string, updatedReply: string) => void
}

export const Replies = ({reply, onDelete, commentId, onUpdate}:ReplyProps) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [replyText, setReplyText] = useState<string>(reply.content)

    const handleUpdate = () =>{
        onUpdate(reply.id, replyText)
        setEdit(!edit)
    }
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
                    <div onClick={() => onDelete(commentId, reply.id)}>Delete</div>
                    <div onClick={() => setEdit(!edit) }>Edit</div>
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
