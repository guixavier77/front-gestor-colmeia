import Award from "@/interfaces/award.interface";
import WalletCustomer from "@/interfaces/walletCustomer.interface";
import api from "@/services/api";
import { useEffect, useState } from "react";


const useLoadWalletCustomer = (hidden: boolean) => {
  const [data, setdata] = useState<WalletCustomer[]>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(hidden) return;
    setloading(true);
    api.get(`reports/customer/historyPromotions`)
        .then((res) => 
          setdata(res?.data?.data)
        )
        .catch(error => console.error('[ERROR API] /reports/customer/historyPromotions', error?.response?.data))
        .finally(() => setloading(false))
  },[ hidden])


  return { loading, data}
}

export default useLoadWalletCustomer;