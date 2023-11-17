import { useState } from 'react';

import data from './data.json';

interface User{
  username: string
  image: {
    png: string,
    webp: string
  }
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
  user: object;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  replies: Reply[];
  score: number;
  user: User;
}

function App() {
  const [comments, setComments] = useState<Comment[]>(data.comments);
  const [newComment, setNewComment] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>(data.currentUser)

  console.log(comments)
  
  const handleSubmit = (commentId: number, replingToUser: string) => {
    const newReplyId = comments.length + 1;
    
    console.log(replingToUser)

    const newReply: Reply = {
      id: newReplyId,
      content: newComment,
      createdAt: 'just now',
      replyingTo: `${replingToUser}`,
      score: 0,
      user: currentUser
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setNewComment('');
    console.log(updatedComments)
  };

  return (
    <>
      <div className=' flex gap-4 flex-col'>
        {comments.map((comment) => (
          <div className=' w-[344px] h-[256px] flex flex-col' key={comment.id}>
            <div>
              <img src='' alt="" />
              <div>{comment.user.username}</div>
              <div>{comment.createdAt}</div>
            </div>
            <div className=' text-base text-[#67727E]'>{comment.content}</div>

            {/* {comment.replies.map((reply) => (
              <div key={reply.id}>{reply.content}</div>
            ))} */}


            {/* <div>
              <label>Reply</label>
              <input type="text" onChange={(e) => setNewComment(e.target.value)} value={newComment} />

              <button onClick={() => handleSubmit(comment.id, comment.user.username)}>Submit Reply</button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
