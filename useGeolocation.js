import { useState, useEffect } from "react"

const useGeolocation = (options)  => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [data, setData] = useState({})

  useEffect(() => {
    const successHandler = e => {
      setLoading(false)
      setError(null)
      setData(e.coords)
    }
    const errorHandler = e => {
      setError(e)
      setLoading(false)
    }
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data }
}

export default useGeolocation;


//usage:
const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation();

//for the first time of use, browser will ask for the permission of geolocation, once approved, it will return the result.