'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { useTab } from '@/contexts/tabContext'
import { ROLE, ROLE_PTBR } from '@/utils/types/roles'
import { TABS_DASH } from '@/utils/types/tabs'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import { colors } from '@/utils/colors/colors'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import MapIcon from '@mui/icons-material/Map'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
const tabs = [
  {
    name: 'Estatisticas',
    icon: <AutoGraphIcon />,
    value: TABS_DASH.DASH,
  },
  {
    name: 'Apicultores',
    icon: <GroupIcon />,
    value: TABS_DASH.APICULTORES,
  },
  {
    name: 'Mapa',
    icon: <MapIcon />,
    value: TABS_DASH.MAPA,
  },
]

const AsideBar = () => {
  const { user } = useContext(DefaultContext)
  const { tabDashSelected, setTabDashSelected } = useTab()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <aside
      className={`flex relative flex-col justify-between h-screen  bg-black p-5 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-56'
      }`}
    >
      <div>
        <div className="absolute right-0 top-4 bg-primary rounded-l-xl ">
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ChevronRightIcon style={{ color: '#FFFFFF' }} />
            ) : (
              <ChevronLeftIcon style={{ color: '#FFFFFF' }} />
            )}
          </button>
        </div>

        <div
          className={`flex justify-center mb-6 ${isCollapsed ? 'mt-10' : ''}`}
        >
          {<Image src={logo} alt="Logo" width={80} height={80} />}
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTabDashSelected(tab.value)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 
                  ${isCollapsed ? 'justify-center' : ''}
                  ${
                    tabDashSelected === tab.value
                      ? 'bg-primary text-white'
                      : 'text-white hover:bg-darkGray'
                  }`}
            >
              {React.cloneElement(tab.icon, {
                style: { fontSize: 24, color: '#FFFFFF' },
              })}
              {!isCollapsed && (
                <span className="text-base font-medium">{tab.name}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`bg-white ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center`}
          >
            <PersonIcon style={{ fontSize: 30, color: colors.black }} />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-white text-sm font-semibold">
                {user?.name?.substring(0, 17)}
              </p>
              <p className="text-white text-sm font-light">
                {ROLE_PTBR[user?.role || 0]}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`w-full py-2 rounded-xl bg-[#363636] text-white text-sm font-semibold transition hover:bg-opacity-80 ${
            isCollapsed ? 'text-center px-0' : ''
          }`}
        >
          {isCollapsed ? <LogoutIcon /> : 'Logout'}
        </button>
      </div>
    </aside>
  )
}

export default AsideBar
