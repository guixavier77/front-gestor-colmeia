import Award from "@/interfaces/award.interface";
import HistoryCustomer from "@/interfaces/historyCustomer.interface";
import WalletCustomer from "@/interfaces/walletCustomer.interface";
import api from "@/services/api";
import { useEffect, useState } from "react";


const useLoadHistoryCustomer = (hidden: boolean) => {
  const [data, setdata] = useState<HistoryCustomer[]>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(hidden) return;
    setloading(true);
    api.get(`reports/customer/historyPoints`)
        .then((res) => 
          setdata(res?.data?.data)
        )
        .catch(error => console.error('[ERROR API] /reports/customer/historyPoints', error?.response?.data))
        .finally(() => setloading(false))
  },[ hidden])


  return { loading, data}
}

export default useLoadHistoryCustomer;