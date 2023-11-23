import { useState } from 'react';

import data from './data.json';

import { v4 } from 'uuid'
import { Comment } from './components/Comment';
import { Replies } from './components/Replies';

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
  
  const [replyProperties, setReplyProperties] = useState<ReplyProperties | null>(null)

  const handleSubmitReply = () =>{
    if(replyProperties){
      const newId = v4()

      const newReply: Reply = {
        id: newId,
        content: newComment,
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
    }else{
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
      <div className='flex flex-col gap-[16px] items-center bg-[#F5F6FA]'>
        {comments.map((comment) => (
          <div key={comment.id} className='flex flex-col gap-[16px] items-center bg-[#F5F6FA]'>
            <Comment 
            comment={comment} 
            onDelete={deleteComment} 
            onUpdate={handleUpdate}
            setNewComment={setNewComment}
            setReplyProperties={setReplyProperties}
            />
            
            {comment.replies.map((reply)=>(
              <Replies 
              key={reply.id} 
              reply={reply} 
              onDelete={deleteReply} 
              commentId={comment.id} 
              onUpdate={handleReplyUpdate}
              />
            ))}
          </div>
        ))}

          <div className=' w-[344px] h-[182px] flex flex-col bg-[#FFFFFF] items-center justify-center'>
            <input type="text" placeholder='Add a comment...' 
              onChange={(e) => setNewComment(e.target.value)} 
              value={newComment} 
              className=' w-[310px] h-[96px] border-solid-[#E9EBF0] border-[1px]'
              />

            <button 
            onClick={()=>handleSubmitReply()}
            className=' w-[104px] h-[48px] bg-[#5357B6] rounded text-base font-medium text-[#FFFFFF]'
            >Send</button>
          </div>
      </div>
    </>
  );
}

export default App;
