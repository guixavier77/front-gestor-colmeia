'use client'
import AsideBar from '@/components/asideBar'
import FooterDash from '@/components/footerDash'
import HeaderDash from '@/components/headerDash'
import { useTab } from '@/contexts/tabContext'
import CustomersContent from '@/app/(dashboard)/dashboard/screens/Apilcutores'
import DashboardContent from '@/app/(dashboard)/dashboard/screens/Dashboard'


import { TABS_DASH } from '@/utils/types/tabs'

export default function Dashboard() {
  const { tabDashSelected } = useTab()

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <AsideBar />

      <div className="flex flex-col h-full w-full ">
        <HeaderDash />

        <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
          <div className="flex h-full justify-center w-full">
            <DashboardContent hidden={tabDashSelected !== TABS_DASH.DASH} />
            <CustomersContent
              hidden={tabDashSelected !== TABS_DASH.CUSTOMERS}
            />

          </div>
        </div>

        <FooterDash />
      </div>
    </main>
  )
}
