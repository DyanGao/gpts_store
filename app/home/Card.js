import Link from "next/link"

const Card = ({card}) => {
  return (
    <div className='p-4 bg-white rounded border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] hover:scale-y-105 hover:scale-x-105 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'>
      <Link href={card.URL || ''} target="_blank" rel="noopener noreferrer">
        <h2 className='text-2xl'>{card.Name}</h2>
        <p className='text-slate-500'>{card.Description}</p> 
      </Link>
    </div>
  )
}

export default Card