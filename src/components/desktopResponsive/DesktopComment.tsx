import React from 'react'
import { useState } from 'react';

import { Reply, User, ReplyProperties } from '../../App';

import imageAmrobson from '../../../public/images/avatars/image-amyrobson.webp'
import imageJuiliusomo from '../../../public/images/avatars/image-juliusomo.webp'
import imageMaxblagun from '../../../public/images/avatars/image-maxblagun.webp'
import { NumberComponent } from '../NumberComponent';
import { DesktopReplyTextArea } from './DesktopReplyTextArea';


interface CommentProps {
    comment:{ 
        id: number | string;
        content: string;
        createdAt: string;
        replies: Reply[];
        score: number;
        user: User;
    },
    newComment: string,
    setNewReply: (value: string) => void,
    setReplyProperties: React.Dispatch<React.SetStateAction<ReplyProperties | null>>,
    onUpdate: (commentId: number | string, updatedComment: string) => void,
    setDeleteCheck: (value: boolean) => void,
    setDeleteCommentId: (value: string | number) => void,
    addNewReply: () => void
}


export const DesktopComment: React.FC<CommentProps> = ({
  comment,
  newComment, 
  setNewReply, 
  setReplyProperties, 
  onUpdate,
  setDeleteCheck,
  setDeleteCommentId,
  addNewReply
}) => {

  const [edit, setEdit] = useState<boolean>(false)
  const [textAfterEdit, setTextAfterEdit] = useState<string>(comment.content)
  
  const [isReply, setIsReply] = useState<boolean>(false)


  const images = [imageJuiliusomo ,imageAmrobson, imageMaxblagun]

  const handleReply = (commentId: number | string, replyingTo: string) => {
    setIsReply(!isReply)
    setNewReply(`@${replyingTo} `)
    setReplyProperties({id: commentId, replyingTo: replyingTo})
  };

  const handleUpdate = () =>{
    onUpdate(comment.id, textAfterEdit)
    setEdit(false)
  }

  const handleDelete = (id: number | string) =>{
    setDeleteCheck(true)
    setDeleteCommentId(id)
  }
  
  return (
    comment.user.username === 'juliusomo' ? 
        <div className='' >
            <div className='flex gap-4 p-4'>
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
            
            <div className=' flex justify-between '>
              <NumberComponent/>
              <div className=' flex gap-4'>
                  <div
                    className=' text-[#ED6368] font-medium text-base cursor-pointer'  
                    onClick={()=> handleDelete(comment.id)}
                    >Delete</div>
                  <div
                  onClick={() => setEdit(!edit)}
                  className=' text-[#5357B6] font-medium text-base cursor-pointer' 
                  >Edit</div>
              </div>
            </div>
            
        </div> 
       : 
       <div className='hidden lg:flex flex-col gap-4 items-center'>

            <div className=' hidden lg:flex lg:flex-row w-[730px] h-[168px] bg-[#FFFFFF]'>
                <NumberComponent/>

                <div>
                    <div className=' flex justify-between p-4 w-[100%]'>
                      <div className=' flex gap-4'>
                          <img src={typeof comment.id === 'number' ? images[comment.id] : ''} 
                              className=' w-[32px] h-[32px]' alt="UserImg" />
                          <div>{comment.user.username}</div>
                          <div>{comment.createdAt}</div>
                      </div>

                      <div 
                      onClick={() => 
                      handleReply(comment.id, comment.user.username)}
                      className=' cursor-pointer text-base text-[#5357B6] font-medium'
                      >Reply</div>
                    </div>

                <div className=' text-base text-[#67727E] w-[620px]'>{comment.content}</div>
              </div>
               
             </div>
             
             {isReply? 
             <DesktopReplyTextArea
                setIsReply={setIsReply}
                newReply={newComment}
                setNewReply={setNewReply}
                addNewReply={addNewReply}
             />
             : <div className='hiden' ></div>}
        </div>
  )
}
