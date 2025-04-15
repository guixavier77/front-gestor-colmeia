import { colors } from '@/utils/colors/colors'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ApiaristPeriodStats {
  totalAssociates: number
  totalDisassociated: number
}

interface ApiaristStats {
  month: ApiaristPeriodStats
  week: ApiaristPeriodStats
  year: ApiaristPeriodStats
}

const GraphicApiaristStats = ({ data }: { data: ApiaristStats }) => {
  const chartData = [
    {
      period: 'Semana',
      totalAssociates: data?.week?.totalAssociates,
      totalDisassociated: data?.week?.totalDisassociated,
    },
    {
      period: 'Mês',
      totalAssociates: data?.month?.totalAssociates,
      totalDisassociated: data?.month?.totalDisassociated,
    },
    {
      period: 'Ano',
      totalAssociates: data?.year?.totalAssociates,
      totalDisassociated: data?.year?.totalDisassociated,
    },
  ]

  return (
    <div className="">
      <div className="w-full" style={{ minHeight: '300px' }}>
        <p className="text-black text-xl font-bold uppercase mb-2">
          Estatísticas de Apicultores
        </p>
        <ResponsiveContainer height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalAssociates"
              name="Ativos"
              fill={colors.primary}
            />
            <Bar
              dataKey="totalDisassociated"
              name="Inativos"
              fill={colors.black}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GraphicApiaristStats
