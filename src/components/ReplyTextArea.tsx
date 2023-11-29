import imageJuiliusomo from '../../public/images/avatars/image-juliusomo.webp'

interface ReplyTextAreaProps{
    setIsReply: (value: boolean) => void,
    newReply: string,
    setNewReply: (value: string) => void,
    addNewReply: () => void
}

export const ReplyTextArea = ({setIsReply, newReply, setNewReply, addNewReply}:ReplyTextAreaProps) => {
    const onReply = () =>{
        setIsReply(false)
        addNewReply()
    }
  return (
    <div className=' w-[344px]
     h-[256px] flex flex-col mt-[16px]
    bg-[#FFFFFF] gap-8 items-center justify-center'>
        <textarea className=' rounded-lg w-[310px] h-[96px] border border-[black]'  
        cols={50} rows={4}
        value={newReply}
        onChange={(e)=> setNewReply(e.target.value)}
        />
        <div className=' flex justify-between w-3/4'>
            <img src={imageJuiliusomo} className=' w-[32px] h-[32px]' />
            <button className=' w-[104px] h-[48px] 
            items-center text-center 
            bg-[#5357B6] rounded-lg text-[#ffffff] font-bold' 
            onClick={onReply}
            >REPLY</button>
        </div>
    </div>
  )
}
