import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { promotion: 'Promoção 1', participantes: 350 },
  { promotion: 'Promoção 2', participantes: 500 },
  { promotion: 'Promoção 3', participantes: 120 },
  { promotion: 'Promoção 4', participantes: 700 },
  { promotion: 'Promoção 5', participantes: 400 },
]

const GraphicRewards = () => (
  <div className="">
    <div className="w-full" style={{ height: '300px' }}>
      <p className="text-black text-2xl font-bold uppercase mb-2">Top Prêmios</p>
      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="promotion" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="participantes" fill="#FFCB08" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default GraphicRewards
