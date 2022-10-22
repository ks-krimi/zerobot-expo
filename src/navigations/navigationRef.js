import React from 'react'

export const navigationRef = React.createRef(null)

export const navigate = (name, parameter) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, parameter)
  }
}
