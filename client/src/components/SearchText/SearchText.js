import React from 'react'

function SearchText({value,onChangeValue}) {
  return (
    <div>
           <input
              type="text"
              name="restaurantName"
              id="restaurantName"
              value={value}
              onChange={(e) => {
                onChangeValue(e.target.value);
              }}
              autoComplete="restaurantName"
              placeholder="ค้นหา..."
              className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
            />
    </div>
  )
}

export default SearchText