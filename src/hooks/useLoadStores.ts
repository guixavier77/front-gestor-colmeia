import Store from "@/interfaces/store.interface";
import User from "@/interfaces/user.interface";
import api from "@/services/api";
import { ROLE } from "@/utils/types/roles";
import { useEffect, useState } from "react";


const useLoadStores = (user: User | null, storeSelected: number | null) => {
  const [stores, setstores] = useState<Store[]>([]);
  const [store, setstore] = useState<Store | null>(null);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(!user || user.role !== ROLE.SUPERADMIN) return;
    setloading(true);
    api.get(`stores`)
      .then((res) => setstores(res?.data?.stores))
      .catch(error => console.error('[ERROR API] /stores', error?.response?.data))
      .finally(() => setloading(false))
  },[user])
  
  useEffect(() => {
    if(!storeSelected) return;
    api.get(`stores/${storeSelected}`)
      .then((res) => setstore(res?.data?.store))
      .catch(error => console.error(`[ERROR API] /stores/${storeSelected}`, error?.response?.data))
      .finally(() => setloading(false))
  }, [storeSelected])
  
  return { loading, store, stores}
}

export default useLoadStores;