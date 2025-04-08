import { DefaultContext } from "@/contexts/defaultContext";
import Award from "@/interfaces/award.interface";
import User from "@/interfaces/user.interface";
import api from "@/services/api";
import { ROLE } from "@/utils/types/roles";
import { useContext, useEffect, useState } from "react";


const useLoadUsers = (hidden: boolean, storeSelected: number | null) => {
  const [users, setusers] = useState<User[]>([])
  const {user} = useContext(DefaultContext);

  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if(hidden || !user) return;
    setloading(true);
    api.get('users')
      .then(res => {
        console.log(res);
        if(user.role === ROLE.SUPERADMIN) setusers(res.data?.users)
        if(user.role !== ROLE.SUPERADMIN) setusers(res.data?.users.filter((u: User) => u.storeId === storeSelected))
      })
      .catch(error => console.error('[ERROR API /users]', error?.response?.data))
      .finally(() => setloading(false))
  },[storeSelected, hidden])


  return { loading, users}
}

export default useLoadUsers;