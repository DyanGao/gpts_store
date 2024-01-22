'use client'
import supabase from './config/supabaseClient';
import Image from 'next/image';
import Cards from '@/app/home/Cards'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import SearchIcon from '@/public/searchIcon.svg'


export default function Home() {
      const [gpts, setGpts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=> {
    const fetchGpts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('gpts_list_all')
          .select('*')
          .textSearch('Name', searchTerm, {
            type: 'websearch',
            config: 'english'
          });
        if (error) {
          throw new Error('Error fetching GPTs')
        }
        setGpts(data)

      } catch (error) {
        setError('Error fetching GPTs')
      } finally {
        setLoading(false)
      }
    }
    fetchGpts()
  }, [searchTerm])

 
 

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value)
  }
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-16">
      
      <section className='container'>
      <div className='w-full text-center sm:text-left justify-self-start'>
        <h1 className='text-center text-2xl sm:text-4xl md:text-6xl md:leading-normal'>Discover Third-party GPTs </h1>
        <h2 className='text-xl text-center'> <strong className='underline  decoration-wavy underline-offset-1 decoration-yellow-300 decoration-2 '>8201</strong> GPTs found and counting</h2>
        <div className="flex justify-center items-center">
          <div className="relative w-[500px]">
            <input    
              type="text"
              value={searchTerm}
              placeholder="Search here..."
              className="border rounded-full w-full m-4 p-4 " 
              onChange = {handleSearch}
              />  
          <button className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'>
            <Image src={SearchIcon} alt='searchIcon' width={20} height={ 20} />
          </button>
          </div>
        </div>
        <div>
          {loading && <p className='flex justify-center items-center text-xl'>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <div >
              {searchTerm ? (
                  gpts.map((gpt, index) => (
                    <div className="p-4 mt-4 bg-white rounded border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] hover:scale-y-105 hover:scale-x-105 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                      key={index}
                    >
                      <Link href={gpt.URL || ''}>
                        <h2 className="text-2xl">{gpt.Name}</h2>
                        <p className="text-slate-500">{gpt.Description}</p>
                      </Link>
                    </div>
                  ))
                ) : null} 
            </div>
          )}
        </div>
        </div>
     
    </section>
  
      {searchTerm === '' && <Cards />}
    </main>
  )
}
