'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { useTab } from '@/contexts/tabContext'
import { ROLE, ROLE_PTBR } from '@/utils/types/roles'
import { TABS_DASH } from '@/utils/types/tabs'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import Image from 'next/image'
import logo from '../../assets/logo.png';
const tabs = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    value: TABS_DASH.DASH,
  },
  {
    name: 'Apicultores',
    icon: <GroupIcon />,
    value: TABS_DASH.CUSTOMERS,
  },
]

const AsideBar = () => {
  const { user } = useContext(DefaultContext)
  const { tabDashSelected, setTabDashSelected } = useTab()
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <div className="flex flex-col bg-black h-screen justify-between shadow-xl w-64 pt-7">
      <div>

      <div className='flex justify-center flex-col items-center'>
        <Image src={logo} alt='Logo' width={100} height={100}/>
        {/* <h1 className="flex flex-col justify-content-center text-2xl text-center text-white font-bold leading-5">
          Rede<span className="text-2xl  text-yellow">Apícola</span>
        </h1> */}
      </div>
        <div className="flex flex-col justify-center mt-5 px-4 py-2">
          {tabs.map(
            (tab) =>
              (tab.value !== TABS_DASH.STORE ||
                user?.role === ROLE.SUPERADMIN) && (
                <button
                  key={tab.value}
                  className={`${tabDashSelected === tab.value ? 'bg-yellow' : 'bg-none'} py-2 rounded-xl pl-2 flex gap-5 items-center mb-2 transition-colors duration-500 ease-in`}
                  onClick={() => setTabDashSelected(tab.value)}
                >
                  {React.cloneElement(tab.icon, {
                    style: {
                      fontSize: 24,
                      color: '#FFFFFF',
                    },
                  })}
                  <p className="text-lg text-white font-normal">{tab.name}</p>
                </button>
              ),
          )}
        </div>
      </div>

      <div className="">
        <div className="flex flex-row px-3 gap-2 items-center self-start">
          <div className="flex bg-white h-12 justify-center rounded-full w-12 items-center">
            <PersonIcon
              style={{
                fontSize: 36,
                color: '#FFCB08',
              }}
            />
          </div>

          <div>
            <p className="text-sm text-white font-bold">
              {user?.name?.substring(0, 17)}
            </p>
            <p className="text-sm text-white font-light">
              {ROLE_PTBR[user?.role || 0]}
            </p>
          </div>
        </div>

        <div className="flex justify-center my-2">
          <button onClick={handleLogout} className={`px-6 rounded-xl mb-2`}>
            {/* <ExitToAppOutlined style={{ fontSize: 24 }} /> */}

            <p className="text-lg text-white font-bold text-center">LOGOUT</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AsideBar
