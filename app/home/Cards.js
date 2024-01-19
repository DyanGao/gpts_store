'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import {fetchCards }from '@/app/action'
import LoadMore from '../components/LoadMore'



const Cards = () => {
  //console.log(supabase)
  
  const [fetchError, setFetchError] = useState(null)
  const [cards, setCards] = useState(null)
    
  useEffect(() => {
    const fetchData = async () => {
    const result = await fetchCards()
     
    if(result.success) {
      setCards(result.data)
      setFetchError(null) 
    } else{
      setFetchError(result.error)
      setCards(null)
    }

  }
  
  fetchData()
  
}, []);
 
  return (
    <>
    <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
      {fetchError && (<p>{fetchError}</p>)}
      {cards && (
        cards.map((card, index) => (
          <Card key={index} card={card} index={index} />
        ))
      )}
      
    </section>
    <LoadMore />
    </>
  )
}

export default Cards