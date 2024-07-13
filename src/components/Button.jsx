import React from 'react'

// we are creating a common button
function Button({
    children,
    type = "button",
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',           //if user gives any styling property this is for that
    ...props                  //if we want to get all the properties user has given 

}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props}>
        {children}
    </button>
  )
}

export default Button
