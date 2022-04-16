import React from 'react'

function Sidebar() {
  return (
    <div className='flex'>
        <div className={`w-72 h-screen bg-light-blue `}>
            Sidebar
        </div>
        <div className='p-7 text-2xl font-semibold'>
            <h1>Home page</h1>
        </div>
    </div>
  )
}

export default Sidebar