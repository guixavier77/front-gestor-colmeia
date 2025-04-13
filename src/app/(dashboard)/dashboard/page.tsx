'use client'
import AsideBar from '@/components/asideBar'
import FooterDash from '@/components/footerDash'
import HeaderDash from '@/components/headerDash'
import { useTab } from '@/contexts/tabContext'
import CustomersContent from '@/app/(dashboard)/dashboard/screens/Apilcutores'
import DashboardContent from '@/app/(dashboard)/dashboard/screens/Dashboard'
import MenuMobile from '@/components/menuMobile'
import MapaApicultoresContent from './screens/MapaApilcutores'
import GestoresContent from './screens/Gestores'
import { TABS_DASH } from '@/constants/dashboardTabs'
import { useContext } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'

export default function Dashboard() {
  const { user } = useContext(DefaultContext)
  const { tabDashSelected } = useTab()

  if (!user) return null

  return (
    <main className="flex h-screen w-screen ">
      <div className="s:hidden">
        <AsideBar />
      </div>

      <div className="flex flex-col h-full w-full ">
        <HeaderDash />

        <div className="flex-grow bg-gray-100 p-4  mb-10 md:pb-0 overflow-auto scroll-custom">
          <div className="flex h-full justify-center w-full">
            <DashboardContent hidden={tabDashSelected !== TABS_DASH.DASH} />
            <CustomersContent
              hidden={tabDashSelected !== TABS_DASH.APICULTORES}
            />
            <MapaApicultoresContent
              hidden={tabDashSelected !== TABS_DASH.MAPA}
            />

            <GestoresContent hidden={tabDashSelected !== TABS_DASH.GESTORES} />
          </div>
        </div>

        <div className="s:hidden">
          <FooterDash />
        </div>

        <div className="t:hidden d:hidden">
          <MenuMobile />
        </div>
      </div>
    </main>
  )
}
