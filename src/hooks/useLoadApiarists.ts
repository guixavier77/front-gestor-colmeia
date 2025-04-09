import api from "@/services/api";
import { useEffect, useState } from "react";


const useLoadApiarist = (hidden: boolean) => {
  const [data, setdata] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(hidden) return;
    setloading(true);
    api.get(`/apiarist/list`)
        .then((res) => 
          setdata(res?.data?.data)
        )
        .catch(error => console.error('[ERROR API] /apiarist/list', error?.response?.data))
        .finally(() => setloading(false))
  },[ hidden])


  return { loading, data}
}

export default useLoadApiarist;