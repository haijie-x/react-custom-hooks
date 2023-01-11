import { useState, useEffect } from "react"

const useFetch = (
  fetchFn: (...args: unknown[]) => Promise<unknown>,
  fetchConfig: {
    isManual?: boolean
    initialValue?: unknown
  } = {
    isManual: false,
    initialValue: "",
  }
) => {
  const { isManual, initialValue } = fetchConfig
  const [data, setData] = useState<any>(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fetch = () => {
    setIsLoading(true)

    fetchFn()
      .then((res) => {
        setData(res)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    !isManual && fetch()
  }, [])

  return {
    data,
    error,
    isLoading,
    fetch,
  }
}

export default useFetch
