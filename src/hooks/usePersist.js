import { useEffect, useState } from "react"

const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false) //key value pairs stored in the local storage will either be "persist": true or "persist": false

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist)) //ensures that the latest value of persist is stored in localStorage, each time persist changes
  }, [persist])

  return [persist, setPersist] //allows other components to access and modify the persisted value conveniently
}

export default usePersist