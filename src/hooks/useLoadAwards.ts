import Award from "@/interfaces/award.interface";
import api from "@/services/api";
import { useEffect, useState } from "react";


const useLoadAwards = (hidden: boolean, storeSelected: number | null) => {
  const [awards, setawards] = useState<Award[]>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(!storeSelected || hidden) return;
    setloading(true);
    console.log(storeSelected);
    api.get(`awards/${storeSelected}`)
        .then((res) => 
          setawards(res?.data?.awards)
        )
        .catch(error => console.error('[ERROR API] /awards', error?.response?.data))
        .finally(() => setloading(false))
  },[storeSelected, hidden])


  return { loading, awards}
}

export default useLoadAwards;