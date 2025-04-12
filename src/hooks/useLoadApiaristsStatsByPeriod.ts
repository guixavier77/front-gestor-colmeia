import Apiarist from '@/interfaces/apiarist.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

interface ApiaristPeriodStats {
  totalAssociates: number
  totalDisassociated: number
}

interface ApiaristStats {
  month: ApiaristPeriodStats
  week: ApiaristPeriodStats
  year: ApiaristPeriodStats
}
const useLoadApiaristStatsByPeriod = (hidden: boolean) => {
  const [data, setdata] = useState<ApiaristStats>({
    month: { totalAssociates: 0, totalDisassociated: 0 },
    week: { totalAssociates: 0, totalDisassociated: 0 },
    year: { totalAssociates: 0, totalDisassociated: 0 },
  })
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/apiarist/stats/period`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /apiarist/stats/period', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadApiaristStatsByPeriod
