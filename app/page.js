'use client'
import supabase from './config/supabaseClient';
import Image from 'next/image';
import Cards from '@/app/home/Cards'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import SearchIcon from '@/public/searchIcon.svg'
import { searchGPTsWithPagination } from '@/app/action'
import Pagination from '@/app/components/Pagination'

export default function Home() {
  const [gpts, setGpts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalGpts, setTotalGpts] = useState(0)
  const [searchPagination, setSearchPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 20,
    hasNextPage: false,
    hasPreviousPage: false
  })

  // Fetch total count on component mount
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const { count, error } = await supabase
          .from('gpts_list_all')
          .select('*', { count: 'exact', head: true })
        
        if (!error && count) {
          setTotalGpts(count)
        }
      } catch (error) {
        console.error('Error fetching total count:', error)
      }
    }
    
    fetchTotalCount()
  }, [])

  const fetchSearchResults = async (term, page = 1) => {
    if (!term.trim()) {
      setGpts([])
      setLoading(false)
      setSearchPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        pageSize: 20,
        hasNextPage: false,
        hasPreviousPage: false
      })
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const result = await searchGPTsWithPagination(term, page, 20)
      
      if (result.success) {
        setGpts(result.data || [])
        setSearchPagination(result.pagination)
        setError(null)
        
        // Scroll to top when page changes (but not on initial search)
        if (page !== 1) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        setError(result.error)
        setGpts([])
        setSearchPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          pageSize: 20,
          hasNextPage: false,
          hasPreviousPage: false
        })
      }
    } catch (error) {
      setError('An error occurred while searching')
      setGpts([])
      setSearchPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        pageSize: 20,
        hasNextPage: false,
        hasPreviousPage: false
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchResults(searchTerm, 1)
  }, [searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  const handleSearchPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= searchPagination.totalPages && newPage !== searchPagination.currentPage) {
      fetchSearchResults(searchTerm, newPage)
    }
  }

  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-16">
      <section className='container'>
        <div className='w-full text-center sm:text-left justify-self-start'>
          <h1 className='text-center text-2xl sm:text-4xl md:text-6xl md:leading-normal'>
            Discover Third-party GPTs 
          </h1>
          <h2 className='text-xl text-center'>
            <strong className='underline decoration-wavy underline-offset-1 decoration-yellow-300 decoration-2'>
              {totalGpts.toLocaleString()}
            </strong> GPTs found and counting
          </h2>
          
          <div className="flex justify-center items-center">
            <div className="relative w-[500px]">
              <input    
                type="text"
                value={searchTerm}
                placeholder="Search here..."
                className="border rounded-full w-full m-4 p-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                onChange={handleSearch}
              />  
              <button className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                <Image src={SearchIcon} alt='searchIcon' width={20} height={20} />
              </button>
            </div>
          </div>
          
          <div>
            {loading && (
              <div className='flex justify-center items-center text-xl py-8'>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                Loading...
              </div>
            )}
            
            {error && (
              <div className="text-center py-4">
                <p className="text-red-600">Error: {error}</p>
                <button 
                  onClick={() => fetchSearchResults(searchTerm, searchPagination.currentPage)}
                  className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && searchTerm && (
              <div>
                {gpts.length > 0 ? (
                  <>
                    <div className="text-center text-gray-600 mb-4">
                      Found {searchPagination.totalItems.toLocaleString()} result{searchPagination.totalItems !== 1 ? 's' : ''} for &ldquo;{searchTerm}&rdquo;
                    </div>
                    <div className="space-y-4">
                      {gpts.map((gpt, index) => (
                        <div 
                          className="p-4 mt-4 bg-white rounded border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] hover:scale-y-105 hover:scale-x-105 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                          key={`${gpt.id || index}-search-${searchPagination.currentPage}`}
                        >
                          <Link href={gpt.URL || ''}>
                            <h2 className="text-2xl">{gpt.Name}</h2>
                            <p className="text-slate-500">{gpt.Description}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    {/* Search Results Pagination */}
                    {searchPagination.totalPages > 1 && (
                      <Pagination
                        currentPage={searchPagination.currentPage}
                        totalPages={searchPagination.totalPages}
                        totalItems={searchPagination.totalItems}
                        pageSize={searchPagination.pageSize}
                        onPageChange={handleSearchPageChange}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600">No results found for &ldquo;{searchTerm}&rdquo;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
  
      {searchTerm === '' && <Cards />}
    </main>
  )
}
