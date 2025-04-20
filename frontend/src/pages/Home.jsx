import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='h-[calc(100vh-3.5rem)] bg-gray-50'>
      <div className="h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 text-black">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">SHIELD</span>
        </h1>

        <p className="text-xl mb-8 max-w-2xl">
          Real-time electricity monitoring, AI-powered insights, and predictive analytics for
          smarter consumption—tailored for both Consumers and Electricity Board Officials.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md transition">
              Sign Up
            </button>
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          ⚡ Save energy. Earn rewards. Monitor smarter.
        </p>
      </div>
    </div>
  )
}

export default Home