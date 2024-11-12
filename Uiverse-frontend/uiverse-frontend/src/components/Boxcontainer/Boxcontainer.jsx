
import React from 'react'

import "./box-container.css"

const Boxcontainer = ({children}) => {
  return (
    <div className='body-container'>{children}</div>
  )
}

export default Boxcontainer