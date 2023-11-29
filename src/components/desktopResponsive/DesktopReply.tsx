import { Reply } from '../../App'
import { useState } from 'react';

import imageRamsesmiron from '../../../public/images/avatars/image-ramsesmiron.webp'
import imageJuiliusomo from '../../../public/images/avatars/image-juliusomo.webp'
import { NumberComponent } from '../NumberComponent';

interface ReplyProps{
    reply: Reply,
    commentId: number | string,
    onUpdate: (replyId: number | string, updatedReply: string) => void,
    setDeleteReplyCheck: (value: boolean) => void,
    setDeleteCommentId: (value: string | number) => void,
    setDeleteReplyId: (value: string | number) => void
}

export const DesktopReplies = ({
    reply,  
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
                <div key={reply.id} className='hidden lg:flex w-[642px] h-[168px] flex-row bg-[#FFFFFF]' >
                    <NumberComponent/>
                    <div>
                        <div className='flex justify-between p-4'> 
                            <div className=' flex gap-4'>
                                <img src={imageJuiliusomo} alt="userImg" className=' w-[32px] h-[32px]'/>
                                <div>{reply.user.username}</div>
                                <div
                                className=' w-[36px] h-[24px] 
                                bg-[#5357B6] text-[#FFFFFF]
                                items-center rounded pl-1
                                '>you</div>
                                <div>{reply.createdAt}</div>
                            </div>
                            
                            <div className=' flex gap-4'>
                                <div
                                className=' text-[#ED6368] font-medium text-base cursor-pointer' 
                                onClick={() => handleDeleteReply(reply.id)}>Delete</div>
                                <div
                                className=' text-[#5357B6] font-medium text-base cursor-pointer' 
                                onClick={() => setEdit(!edit) }>Edit</div>
                            </div>   
                        </div>
                        
                        {edit ?
                            <div className=' flex gap-8'>
                                <textarea rows={4} cols={50}
                                value={replyText} 
                                onChange={(e)=>setReplyText(e.target.value)}
                                className=' w-[400px] border-[2px] border-[black] resize-none'
                                >{reply.content}</textarea>
                                
                                <button className=' w-[104px] h-[48px] 
                                bg-[#5357B6] items-center 
                                font-medium text-base text-[#ffffff] rounded'
                                onClick={handleUpdate}
                                >UPDATE</button>
                            </div> 
                            : 
                            <div className=' w-[530px]'>{`${reply.content}`}</div> 
                        }
                    </div>
            </div>
            
            : 
                <div key={reply.id} className='hidden lg:flex w-[642px] h-[168px] flex-row bg-[#FFFFFF]' >
                    <NumberComponent/>

                    <div>
                        <div className='flex gap-4 p-4'>
                            <img src={imageRamsesmiron} alt="userImg" className=' w-[32px] h-[32px]'/>
                            <div>{reply.user.username}</div>
                            <div>{reply.createdAt}</div>
                        </div>
                    
                        <div className=' w-[530px]'>{`@${reply.replyingTo} ${reply.content}`}</div>
                    </div>
                    
                </div>
            }
    </div>
  )
}
