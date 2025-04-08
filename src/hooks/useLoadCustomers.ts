import { DefaultContext } from "@/contexts/defaultContext";
import Award from "@/interfaces/award.interface";
import HistoryCustomer from "@/interfaces/historyCustomer.interface";
import User from "@/interfaces/user.interface";
import WalletCustomer from "@/interfaces/walletCustomer.interface";
import api from "@/services/api";
import { useContext, useEffect, useState } from "react";


const useLoadCustomers = (hidden: boolean) => {
  const {storeSelected} = useContext(DefaultContext);
  const [data, setdata] = useState<User[]>([]);
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(hidden || !storeSelected) return;
    setloading(true);
    api.get(`reports/clientsByStore/${storeSelected}`)
        .then((res) => 
          setdata(res?.data?.data ?? [])
          // console.log(res?.data?.data)
        )
        .catch(error => console.error('[ERROR API] /reports/customer/historyPoints', error?.response?.data))
        .finally(() => setloading(false))
  },[hidden, storeSelected])


  return { loading, data}
}

export default useLoadCustomers;