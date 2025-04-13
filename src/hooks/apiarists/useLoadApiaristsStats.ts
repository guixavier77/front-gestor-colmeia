import Apiarist from '@/interfaces/apiarist.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

interface ApiaristStats {
  totalAssociates: number
  totalDisassociated: number
}
const useLoadApiaristStats = (hidden: boolean) => {
  const [data, setdata] = useState<ApiaristStats>({
    totalAssociates: 0,
    totalDisassociated: 0,
  })
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/apiarist/stats`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /apiarist/stats', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadApiaristStats
