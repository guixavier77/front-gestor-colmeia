import api from "@/services/api";
import { useCallback, useEffect, useState } from "react";


const useLoadApiarist = (hidden: boolean) => {
  const [data, setdata] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false)


  const loadData = useCallback(async () => {
    try {
      console.log('CHAMOU A FUNÇÃO');
      setloading(true);
      const res = await api.get(`/apiarist/list`);
      setdata(res?.data?.data);
    } catch (error: any) {
      console.error('[ERROR API] /apiarist/list', error?.response?.data);
    } finally {
      setloading(false);
    }
  }, []);
  
  useEffect(() => {
    if(hidden) return;
    setloading(true);
    loadData();
  },[loadData,hidden])


  return { loading, data, loadData}
}

export default useLoadApiarist;