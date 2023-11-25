
interface DeleteProps{
    id: number | string,
    onDelete: (commentId: number | string ) => void,
    setDeleteCheck: (value: boolean) => void,
    setDeleteCommentId: (value: string | number) => void
}

export const Delete = ({id, onDelete, setDeleteCheck, setDeleteCommentId}:DeleteProps) => {
    const handleDelete = () =>{
        onDelete(id)
        setDeleteCheck(false)
        setDeleteCommentId('')
    }
  return (
    <div className=" 
    absolute z-40 top-1/4 
    w-[344px] h-[224px] bg-[#FFFFFF] rounded flex flex-col p-4 gap-4"
     >
        <h2 className=" font-medium text-xl text-[#334253]">Delete Comment</h2>
        <p className=" w-[288px]">
            Are you sure you want to delete this comment? 
            This will remove the comment and can’t be undone.
        </p>

        <div>
            <button className=" w-[138px] h-[48px] 
            rounded items-center bg-[#67727E] 
            text-base font-medium text-[#FFFFFF]
            "
            onClick={()=>setDeleteCheck(false)}
            >
                NO,CANCEL
            </button>
            <button className=" w-[138px] h-[48px] 
            rounded items-center bg-[#ED6368] 
            text-base font-medium text-[#FFFFFF] ml-3"
            onClick={handleDelete} 
            >
                YES,DELETE
            </button>
        </div>
        
     </div>
  )
}
