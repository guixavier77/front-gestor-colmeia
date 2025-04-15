import ApiaristAssociatesTable from '@/components/apiaristAssociatesTables'
import CardDash from '@/components/cardDash'
import GraphicApiaristStats from '@/components/graphicApiaristStats'
import TopDash from '@/components/topDash'
import useLoadApiaristLatest from '@/hooks/apiarists/useLoadApiaristsLatest'
import useLoadApiaristStats from '@/hooks/apiarists/useLoadApiaristsStats'
import useLoadApiaristStatsByPeriod from '@/hooks/apiarists/useLoadApiaristsStatsByPeriod'
import Group from '@mui/icons-material/Group'
import GroupOffIcon from '@mui/icons-material/GroupRemove'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import { Skeleton } from '@mui/material'

const DashboardContent = ({ hidden }: { hidden: boolean }) => {
  const { data, loading } = useLoadApiaristStats(hidden)
  const { data: apiaristStats, loading: loadingStats } =
    useLoadApiaristStatsByPeriod(hidden)
  const { data: apiaristLatest, loading: loadingLatest } =
    useLoadApiaristLatest(hidden)

  return (
    <div hidden={hidden} className="w-full ">
      <TopDash
        title="Estatísticas"
        description="Veja as principais métricas e informações dos apicultores associados."
        icon={InsertChartOutlinedIcon}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={100}
              className="rounded-xl bg-light"
            />
            <Skeleton
              variant="rectangular"
              height={100}
              className="rounded-xl bg-light"
            />
          </>
        ) : (
          <>
            <CardDash
              icon={<Group />}
              title="Membros Ativos"
              value={data?.totalAssociates ?? 0}
            />
            <CardDash
              icon={<GroupOffIcon />}
              title="Membros Inativos"
              value={data?.totalDisassociated ?? 0}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded-xl shadow-md">
          {loadingStats ? (
            <Skeleton
              variant="rectangular"
              height={300}
              className="rounded-xl bg-light"
            />
          ) : (
            <GraphicApiaristStats data={apiaristStats} />
          )}
        </div>
      </div>

      <div className="mt-10">
        {loadingLatest ? (
          <Skeleton
            variant="rectangular"
            height={400}
            className="rounded-xl bg-light"
          />
        ) : (
          <ApiaristAssociatesTable data={apiaristLatest} />
        )}
      </div>
    </div>
  )
}

export default DashboardContent
