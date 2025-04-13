import Apiarist from '@/interfaces/apiarist.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

const useLoadUsers = (hidden: boolean) => {
  const [data, setdata] = useState<Apiarist[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/users/list`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /users/list', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadUsers
