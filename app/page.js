import Hero from '@/app/home/Hero'
import Cards from '@/app/home/Cards'




export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-16">
      <Hero />
      <Cards />
      
    </main>
  )
}
