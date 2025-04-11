import TopDash from '@/components/topDash'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const DashboardContent = ({ hidden }: {hidden: boolean}) => {
  // const { data, loading } = useLoadDashboardTotals(hidden)
  // const theme = useTheme() 
  
  return (
    <div hidden={hidden} className="w-full">
      <TopDash
        title="Estatísticas"
        description="Veja as principais métricas e informações da loja e promoções."
        icon={InsertChartOutlinedIcon}
      />

      {/* <div className="grid grid-cols-4 gap-6">
        <CardDash
          icon={<Group />}
          title="Clientes"
          value={data?.totalClients ?? 0}
        />
        <CardDash
          icon={<PaidIcon />}
          title="Promoções Ativas"
          value={data?.totalPromotionsActive ?? 0}
        />
        <CardDash
          icon={<PaidOutlinedIcon />}
          title="Promoções Finalizadas"
          value={data?.totalPromotionsInactive ?? 0}
        />
        <CardDash
          icon={<EmojiEvents />}
          title="Resgates Pendentes"
          value={12}
        />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-9 flex flex-col gap-6"> 
          <div className="w-full">
            <GraphicPromotions data={data?.topPromotions ?? []}/>
          </div>
          <div className="w-full mt-2">
            <GraphicRewards />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-6">
          <div className="w-full">
            <p className="text-black text-2xl font-bold uppercase mb-2">Top Clientes</p>
            <TableDash columns={columns} data={data?.topClients ?? []} rowKey="id" />
          </div>

          <div className="w-full">
            <p className="text-black text-2xl font-bold uppercase mb-2">Top Operadores</p>
            <TableDash columns={columns} data={data?.topOperators ?? []} rowKey="id" />
          </div>
        </div>
      </div> */}




    </div>
  )
}

export default DashboardContent
