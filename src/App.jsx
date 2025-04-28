import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import Hero from './pages/hero/Hero'
import ExploreSyria from './pages/exploreSyria/ExploreSyria'
import TopDestinations from './pages/topDestinations/TopDestinations'
import BookAdventure from './pages/bookAdventure/BookAdventure'
import Highlight from './pages/highlight/Highlight'
import Newsletter from './pages/newsletter/Newsletter'
import Footer from './components/footer/Footer'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <LanguageProvider>
      <>
        <Navbar />
        <Hero />
        <ExploreSyria />
        <TopDestinations />
        <BookAdventure />
        <Highlight />
        <Newsletter />
        <Footer />
      </>
    </LanguageProvider>

  )
}

export default App
