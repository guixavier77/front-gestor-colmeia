import Apiarist from '@/interfaces/apiarist.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

interface ApiaristLatest {
  id: number
  name: string
  cpf: string
  date: Date
}

interface ApiaristStats {
  latestDisassociated: ApiaristLatest[]
  latestAssociated: ApiaristLatest[]
}
const useLoadApiaristLatest = (hidden: boolean) => {
  const [data, setdata] = useState<ApiaristStats>({
    latestAssociated: [],
    latestDisassociated: [],
  })
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/apiarist/latest`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /apiarist/latest', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadApiaristLatest
