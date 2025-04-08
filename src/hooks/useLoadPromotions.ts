import { DefaultContext } from "@/contexts/defaultContext";
import Award from "@/interfaces/award.interface";
import Promotion from "@/interfaces/promotion.interface";
import Store from "@/interfaces/store.interface";
import User from "@/interfaces/user.interface";
import api from "@/services/api";
import { ROLE } from "@/utils/types/roles";
import { useContext, useEffect, useState } from "react";


const useLoadPromotions = (hidden: boolean) => {
  const {storeSelected} = useContext(DefaultContext)
  const [promotions, setpromotions] = useState<Promotion[]>([]);
  const [loading, setloading] = useState<boolean>(false)


  useEffect(() => {
    if(!storeSelected || hidden) return;
    setloading(true);
    api.get(`promotions/${storeSelected}`)
        .then((res) => setpromotions(res?.data?.promotions))
        .catch(error => console.error('[ERROR API] /promotions', error?.response?.data))
        .finally(() => setloading(false))
  },[storeSelected, hidden])
  
  return { loading, promotions }
}

export default useLoadPromotions;