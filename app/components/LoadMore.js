'use client';
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useInView } from 'react-intersection-observer'
import Card from '@/app/home/Card';
import {fetchCards}from '@/app/action';

let page = 2;
const LoadMore = () => {
  const { ref, inView } = useInView()
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setIsLoading(true)
      const delay = 500
      const timeoutId = setTimeout(() => {
        fetchCards(page)
        .then((res) => {
          setCards([...cards, ...res.data])
          page++
        })
      setIsLoading(false)
      }, delay)
     return () => clearTimeout(timeoutId) 
    } 
  }, [inView, cards, isLoading])
 
  return (
    <>
    <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
    
        {cards.map((card, index) => (
          <Card key={index} card={ card} />
        ))
        }
      
      </section>
      <section className="flex justify-center items-center w-full pt-8">
      <div ref={ref}>
          {inView && isLoading && (
            <Image 
          src='./spinner.svg'
          alt='spinner'
          width={56}
              height={56}
          className="object-contain"
        />
      )}
        
      </div>
    </section>
</>
  )
}

export default LoadMore