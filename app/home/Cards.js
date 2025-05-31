'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import { fetchCardsWithPagination } from '@/app/action'
import Pagination from '../components/Pagination'

const Cards = () => {
  const [fetchError, setFetchError] = useState(null)
  const [cards, setCards] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 21,
    hasNextPage: false,
    hasPreviousPage: false
  })

  const fetchData = async (page = 1) => {
    setLoading(true)
    setFetchError(null)
    
    try {
      const result = await fetchCardsWithPagination(page, 21)
      
      if (result.success) {
        setCards(result.data)
        setPagination(result.pagination)
        setFetchError(null)
        
        // Scroll to top when page changes
        if (page !== 1) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        setFetchError(result.error)
        setCards(null)
      }
    } catch (error) {
      console.error('Error fetching cards:', error)
      
      // Check if it's a configuration error
      if (error.message?.includes('Supabase configuration')) {
        setFetchError('Database configuration error. Please check your environment variables.')
      } else {
        setFetchError('An unexpected error occurred while loading GPTs.')
      }
      setCards(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== pagination.currentPage) {
      fetchData(newPage)
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <span className="ml-3 text-lg text-gray-600">Loading GPTs...</span>
      </div>
    )
  }

  return (
    <>
      <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
        {fetchError && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600 text-lg mb-2">{fetchError}</p>
            {fetchError.includes('environment variables') && (
              <div className="text-sm text-gray-600 mb-4">
                <p>Please create a .env.local file in your project root with:</p>
                <code className="block bg-gray-100 p-2 mt-2 text-left">
                  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br/>
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
                </code>
              </div>
            )}
            <button 
              onClick={() => fetchData(pagination.currentPage)}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <Card key={`${card.id || index}-${pagination.currentPage}`} card={card} index={index} />
          ))
        ) : (
          !fetchError && !loading && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 text-lg">No GPTs found.</p>
            </div>
          )
        )}
      </section>

      {/* Only show pagination if we have data and multiple pages */}
      {cards && cards.length > 0 && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default Cards