import React from 'react'

function Sidebar() {
  return (
 <div className="h-screen drawer drawer-mobile w-full">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="flex flex-col items-center justify-center drawer-content">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay" /> 
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>

  )
}

export default Sidebar