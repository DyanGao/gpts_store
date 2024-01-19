import React from 'react'

const Hero = () => {
  return (
    <section className='container'>
      <div className='w-full text-center sm:text-left justify-self-start'>
        <h1 className='text-center text-2xl sm:text-4xl md:text-6xl md:leading-normal'>Discover Third-party GPTs Store</h1>
        <h2 className='text-xl text-center'> <strong className='underline  decoration-wavy underline-offset-1 decoration-yellow-300 decoration-2 '>8201</strong> GPTs found and counting</h2>
        <div className="mt-4 text-center p-4">
        <input
       
        type="text"
        placeholder="Search here..."
        className="border rounded-full w-full max-w-lg m-4 p-4" 
       
      />  
        </div>
      </div>  
    </section>
  )
}

export default Hero