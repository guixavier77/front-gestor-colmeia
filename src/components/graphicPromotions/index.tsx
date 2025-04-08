import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Promotion {
  id: number;
  title: string;
  totalParticipants: number;
}

const GraphicPromotions = ({ data }: { data: Promotion[] }) => {


  return (
    <div className="">
      <div className="w-full" style={{ height: '300px' }}>
        <p className="text-black text-2xl font-bold uppercase mb-2">Top Promoções</p>
        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalParticipants" name="Total Participantes" fill="#FFCB08" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GraphicPromotions
