import k from './assest/images.png'
import { useNavigate } from 'react-router-dom'
import Loading from 'react-loading-components'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const First = () => {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  const handleStartShopping = () => {
    const token = localStorage.getItem('token') // check JWT token
    if (token) {
      navigate('/main') // user logged in → go to main shopping page
    } else {
      navigate('/signup') // no token → redirect to signup
    }
  }

  if (!loaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading
          type="spinning_circles"
          width={100}
          height={100}
          fill="#FF9900"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="bg-black text-white px-6 py-4 flex items-center">
        <img src={k} alt="logo" className="h-10" />
        <span className="ml-4 text-sm">Deliver to India</span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-32 text-center px-4">

        <motion.img
          src={k}
          alt="Amazon Logo"
          className="w-64 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Everything you need. Delivered fast.
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Shop millions of products, great deals, and fast delivery – all in one place.
        </motion.p>

        <motion.button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-3 rounded shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartShopping} // check token before navigating
        >
          Start Shopping
        </motion.button>

      </div>
    </div>
  )
}
