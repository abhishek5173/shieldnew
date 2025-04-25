import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div 
      className='h-[calc(100vh-3.5rem)] bg-gray-50 bg-cover bg-center' 
      style={{ backgroundImage: "url('/bgnew.jpg')" }}
    >
      <div className="h-full flex flex-col items-center justify-center text-center px-4 bg-gray-400/40">
        <h1 className="text-8xl font-extrabold mb-4 text-black">
          <span className='text-4xl'>Welcome to</span> <span className="text-indigo-600 dark:text-indigo-400">SHIELD</span>
        </h1>
        <p className="mb-8 text-4xl text-black">
          ⚡ Save energy.💸 Earn rewards.📊 Monitor smarter.
        </p>
        <div className='flex gap-6'>
        <img src='/upcst.png' className='w-60 h-60 mb-6' alt='upcst' />
        <img src='/bbaulns.png' className='w-60 h-60 mb-6' alt='bbau'/>
        </div>
        <a 
          href="mailto:rambopranjal63@gmail.com" 
          className='mb-6 font-bold text-white bg-blue-700 rounded-xl px-8 py-3'
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}

export default Home