import { useState } from 'react';

import data from './data.json';

import { v4 } from 'uuid'
import { Comment } from './components/Comment';
import { Replies } from './components/Replies';
import { Delete } from './components/Delete';
import { DeleteReply } from './components/DeleteReply';
import { DesktopComment } from './components/desktopResponsive/DesktopComment';
import { DesktopReplies } from './components/desktopResponsive/DesktopReply';

import imageJuiliusomo from '../public/images/avatars/image-juliusomo.webp'

export interface User{
  username: string
  image: {
    png: string,
    webp: string
  }
}

export interface Reply {
  id: number | string ;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
  user: User;
}

export interface CommentInterFace {
  id: number | string;
  content: string;
  createdAt: string;
  replies: Reply[];
  score: number;
  user: User;
}

export interface ReplyProperties{
  id: number | string ,
  replyingTo: string;
}

function App() {
  const [comments, setComments] = useState<CommentInterFace[]>(data.comments);
  const [newComment, setNewComment] = useState<string>('');
  const [newReplyToAdd, setNewReplyToAdd] = useState<string>('')

  const [deleteCheck, setDeleteCheck] = useState<boolean>(false)
  const [deleteReplyCheck, setDeleteReplyCheck] = useState<boolean>(false)

  const [deleteComentId, setDeleteCommentId] = useState<number | string>('')
  const [deleteReplyId, setDeleteReplyId] = useState<number | string>('')
  
  const [replyProperties, setReplyProperties] = useState<ReplyProperties | null>(null)

  const addNewComment = () =>{
      const newId = v4()

      const newCommentToAdd: CommentInterFace = {
        id: newId,
        content: newComment,
        createdAt: 'just now',
        replies: [],
        score: 0,
        user: data.currentUser
      }
      
      setComments((prevComments) => [...prevComments, newCommentToAdd])
      setNewComment('')
  }

  const addNewReply = () =>{
    const newId = v4()

    const newReply: Reply = {
      id: newId,
      content: newReplyToAdd,
      createdAt: 'just now',
      replyingTo: `${replyProperties?.replyingTo}`,
      score: 0,
      user: data.currentUser
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === replyProperties?.id) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setNewComment('');
  }

  const deleteReply = (commentId: number | string, replyId: number | string) =>{
    const updatedComments = comments.map((comment)=>{
      if(comment.id === commentId){
        return{
          ...comment,
          replies: comment.replies.filter((reply)=>reply.id !== replyId)
        }
      }
      return comment
    })

    setComments(updatedComments)
  }

  const deleteComment = (commentId: string | number) =>{
    const updatedComments = comments.filter((comment)=>comment.id !== commentId)
    setComments(updatedComments)
  }

  const handleUpdate = (commentId: number | string, updatedComment: string) =>{
    setComments((prevComments)=>
      prevComments.map((comment)=>
        comment.id === commentId ? {...comment, content: updatedComment} : comment
      )
    )

  }

  const handleReplyUpdate = (replyId: number | string, updatedReply: string) =>{
    setComments((prevComments)=>
      prevComments.map((comment)=>({
        ...comment,
        replies: comment.replies.map((reply)=>
          reply.id === replyId ? {...reply, content: updatedReply} : reply
        )
      }))
      )
  }

  return (
    <>
      <div className='flex flex-col gap-[16px] items-center bg-[#F5F6FA] relative pb-[8px]'>
        {comments.map((comment) => (
          <div key={comment.id} className='flex flex-col gap-[16px] items-center bg-[#F5F6FA] mt-2'>
            <Comment 
            comment={comment} 
            newComment={newReplyToAdd}
            onUpdate={handleUpdate}
            setNewReply={setNewReplyToAdd}
            setReplyProperties={setReplyProperties}
            setDeleteCheck={setDeleteCheck}
            setDeleteCommentId={setDeleteCommentId}
            addNewReply={addNewReply}
            />

            {/* comments for desktopResponsive */}

            <DesktopComment
            comment={comment}
            newComment={newReplyToAdd}
            addNewReply={addNewReply}
            setNewReply={setNewReplyToAdd}
            setReplyProperties={setReplyProperties} 
            onUpdate={handleUpdate}
            setDeleteCheck={setDeleteCheck}
            setDeleteCommentId={setDeleteCommentId}
            />
            
            <div className=' flex gap-[44px]'>
              <div className=' w-[2px] bg-[#E9EBF0]'></div>
              <div className=' flex flex-col gap-4'>
                {comment.replies.map((reply)=>(
                  <Replies 
                  key={reply.id} 
                  reply={reply} 
                  commentId={comment.id} 
                  onUpdate={handleReplyUpdate}
                  setDeleteReplyCheck={setDeleteReplyCheck}
                  setDeleteCommentId={setDeleteCommentId}
                  setDeleteReplyId={setDeleteReplyId}
                  />
                ))}
                
                {/* replies for desktop Responsive */}

                {comment.replies.map((reply)=>(
                  <DesktopReplies
                  key={reply.id} 
                  reply={reply} 
                  commentId={comment.id} 
                  onUpdate={handleReplyUpdate}
                  setDeleteReplyCheck={setDeleteReplyCheck}
                  setDeleteCommentId={setDeleteCommentId}
                  setDeleteReplyId={setDeleteReplyId}
                  />
                ))}
            </div>
            </div>
          </div>
        ))}

        
        {deleteCheck ? 
          <Delete 
          id={deleteComentId} 
          onDelete={deleteComment} 
          setDeleteCheck={setDeleteCheck} 
          setDeleteCommentId={setDeleteCommentId}
          /> 
          :
          deleteReplyCheck ? 
          <DeleteReply 
          commentId={deleteComentId} 
          replyId={deleteReplyId}
          onDelete={deleteReply} 
          setDeleteCheck={setDeleteReplyCheck} 
          setDeleteCommentId={setDeleteCommentId}
          setDeleteReplyId={setDeleteReplyId}
          />  
          : 
          <div className=' hidden'></div>
        }

        {/* add new text section for desktop responsive */}
          <div className='hidden lg:flex lg:w-[730px] lg:h-[144px]
          flex-row  bg-[#FFFFFF] items-center justify-between p-4'>
            <img src={imageJuiliusomo} alt="img" className='w-[34px] h-[34px]' />
            <textarea
             placeholder='Add a comment...' 
              onChange={(e) => setNewComment(e.target.value)} 
              value={newComment} 
              className=' resize-none w-[310px] h-[96px] lg:w-[500px] lg:h-[96px]
              border-solid-[#E9EBF0] border-[1px]'
              />

            <button 
            onClick={addNewComment}
            className=' w-[104px] h-[48px] bg-[#5357B6] rounded text-base font-medium text-[#FFFFFF]'
            >Send</button>
          </div>

          {/* add new comment section for mobile responsive */}
          <div className=' flex lg:hidden w-[344px] h-[190px]
          flex-col  bg-[#FFFFFF] items-center justify-between p-4'>
            <textarea
             placeholder='Add a comment...' 
              onChange={(e) => setNewComment(e.target.value)} 
              value={newComment} 
              className=' resize-none w-[310px] h-[96px] lg:w-[500px] lg:h-[96px]
              border-solid-[#E9EBF0] border-[1px]'
              />

              <div className='flex gap-24'>
                <img src={imageJuiliusomo} alt="img" className='w-[34px] h-[34px]' />
                <button 
                onClick={addNewComment}
                className=' w-[104px] h-[48px] bg-[#5357B6] rounded text-base font-medium text-[#FFFFFF]'
                >Send</button>
              </div>
          </div>
      </div>
    </>
  );
}

export default App;
