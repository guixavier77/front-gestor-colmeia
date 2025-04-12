import ApiaristAssociatesTable from '@/components/apiaristAssociatesTables'
import ApiaristSummaryTable from '@/components/apiaristSummary'
import CardDash from '@/components/cardDash'
import GraphicApiaristStats from '@/components/graphicApiaristStats'
import TopDash from '@/components/topDash'
import useLoadApiaristLatest from '@/hooks/useLoadApiaristsLatest'
import useLoadApiaristStats from '@/hooks/useLoadApiaristsStats'
import useLoadApiaristStatsByPeriod from '@/hooks/useLoadApiaristsStatsByPeriod'
import Group from '@mui/icons-material/Group'
import GroupOffIcon from '@mui/icons-material/GroupRemove'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'

const DashboardContent = ({ hidden }: { hidden: boolean }) => {
  const { data, loading } = useLoadApiaristStats(hidden)
  const { data: apiaristStats, loading: loadingStats } =
    useLoadApiaristStatsByPeriod(hidden)
  const { data: apiaristLatest, loading: loadingLatest } =
    useLoadApiaristLatest(hidden)

  return (
    <div hidden={hidden} className="w-full px-4 md:px-6">
      <TopDash
        title="Estatísticas"
        description="Veja as principais métricas e informações dos apicultores associados."
        icon={InsertChartOutlinedIcon}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <CardDash
          icon={<Group />}
          title="Associados"
          value={data?.totalAssociates ?? 0}
        />
        <CardDash
          icon={<GroupOffIcon />}
          title="Desassociados"
          value={data?.totalDisassociated ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <GraphicApiaristStats data={apiaristStats} />
        </div>
      </div>

      <ApiaristAssociatesTable data={apiaristLatest} />
    </div>
  )
}

export default DashboardContent
