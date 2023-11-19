import { useState } from 'react';

import data from './data.json';

import { v4 as uuidv4, v4 } from 'uuid'

interface User{
  username: string
  image: {
    png: string,
    webp: string
  }
}

interface Reply {
  id: number | string ;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
  user: User;
}

interface Comment {
  id: number | string;
  content: string;
  createdAt: string;
  replies: Reply[];
  score: number;
  user: User;
}

interface ReplyProperties{
  id: number | string ,
  replyingTo: string;
}

function App() {
  const [comments, setComments] = useState<Comment[]>(data.comments);
  const [newComment, setNewComment] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>(data.currentUser)
  
  const [replyProperties, setReplyProperties] = useState<ReplyProperties | null>(null)
 
  const handleReply = (commentId: number | string, replyingTo: string) => {
    setNewComment(`@${replyingTo} `)
    setReplyProperties({ id: commentId, replyingTo });
  };

  const handleSubmitReply = () =>{

    if(replyProperties){
      const newId = v4()

      const newReply: Reply = {
        id: newId,
        content: newComment,
        createdAt: 'just now',
        replyingTo: `${replyProperties?.replyingTo}`,
        score: 0,
        user: currentUser
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

      const newCommentToAdd: Comment = {
        id: newId,
        content: newComment,
        createdAt: 'just now',
        replies: [],
        score: 0,
        user: currentUser
      }
      
      setComments((prevComments) => [...prevComments, newCommentToAdd])
      setNewComment('')
    }
  }

  const deleteComment = (commentId: number | string, replyId: number | string) =>{
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


  return (
    <>
      <div className=' flex flex-col gap-[16px] items-center bg-[#F5F6FA]'>
        {comments.map((comment) => (
          comment.user.username === 'juliusomo' ? 
          <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
              <div className=' flex gap-4 p-4'>
                <img src={comment.user.image.webp} className=' w-[32px] h-[32px]' alt="UserImg" />
                <div>{comment.user.username}</div>
                <div>{comment.createdAt}</div>
              </div>
                
                <div className=' text-base text-[#67727E] p-4'>{comment.content}</div>
                {/* <div>
                  <div onClick={() => deleteComment(comment.id, reply.id)}>Delete</div>
                  <div onClick={() => '' }>Edit</div>
                </div> */}
             </div> 
          
          :
          <div key={comment.id} className='flex flex-col gap-4 items-center'>
            
            <div className=' w-[344px] h-[256px] flex flex-col bg-[#FFFFFF]' >
              <div className=' flex gap-4 p-4'>
                <img src={comment.user.image.webp} className=' w-[32px] h-[32px]' alt="UserImg" />
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

            {comment.replies.map((reply) => (
              reply.user.username === 'juliusomo' ?
                <div key={reply.id} className=' w-[344px] h-[256px] flex flex-col ml-6 bg-[#FFFFFF]' >
                <div className='flex gap-4 p-4'>
                  <img src={reply.user.image.webp} alt="userImg" className=' w-[32px] h-[32px]'/>
                  <div>{reply.user.username}</div>
                  <div>{reply.createdAt}</div>
                </div>
  
                <div className=' p-4'>{`@${reply.replyingTo} ${reply.content}`}</div>

                <div>
                  <div onClick={() => deleteComment(comment.id, reply.id)}>Delete</div>
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
