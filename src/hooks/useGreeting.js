import { useEffect, useState } from 'react'

const useGreeting = () => {
  const [time, setTime] = useState(new Date().getHours())
  const [greeting, setGreeting] = useState(null)

  useEffect(() => {
    setTime(new Date().getHours())
    if (time >= 0 && time <= 12) {
      setGreeting('Bonjour')
    } else {
      setGreeting('Bonsoir')
    }
  }, [time, setTime])

  return { greeting }
}

export default useGreeting
