import imageJuiliusomo from '../../../public/images/avatars/image-juliusomo.webp'

interface ReplyTextAreaProps{
    setIsReply: (value: boolean) => void,
    newReply: string,
    setNewReply: (value: string) => void,
    addNewReply: () => void
}

export const DesktopReplyTextArea = ({setIsReply, newReply, setNewReply, addNewReply}:ReplyTextAreaProps) => {
    const onReply = () =>{
        setIsReply(false)
        addNewReply()
    }
  return (
    <div className=' w-[730px]
     h-[144px] flex flex-row
    bg-[#FFFFFF] gap-8 items-center justify-center'>
        <img src={imageJuiliusomo} className=' w-[32px] h-[32px]' />

        <textarea className=' rounded-lg w-[506px] h-[96px] border border-[black]'  
        cols={50} rows={4}
        value={newReply}
        onChange={(e)=> setNewReply(e.target.value)}
        />
           
        <button className=' w-[104px] h-[48px]  items-center text-center 
         bg-[#5357B6] rounded-lg text-[#ffffff] font-bold' 
         onClick={onReply}>REPLY</button>
    </div>
  )
}
