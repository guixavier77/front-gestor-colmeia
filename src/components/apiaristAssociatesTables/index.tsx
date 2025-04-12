import masks from '@/utils/masks/masks'
import TableDash from '../tableDash'
import dateFormat from 'dateformat'
interface ApiaristLatest {
  id: number
  name: string
  cpf: string
  date: Date
}

interface ApiaristStats {
  latestDisassociated: ApiaristLatest[]
  latestAssociated: ApiaristLatest[]
}
const ApiaristAssociatesTable = ({ data }: { data: ApiaristStats }) => {
  const columns = [
    {
      header: 'Data',
      field: 'date',
      render: (value: any) =>
        value ? dateFormat(value, 'dd/mm/yyyy HH:MM') : '',
    },

    {
      header: 'name',
      field: 'name',
    },
    {
      header: 'CPF',
      field: 'cpf',
      render: (value: any) =>
        value ? masks.cpfMask(value) : masks.cpfMask('00000000000'),
    },
  ]
  return (
    <div className="w-full grid d:grid-cols-2 grid-cols-1 gap-6 mt-10">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-black text-xl font-bold uppercase mb-2">
          Últimos associados
        </p>
        <TableDash
          columns={columns}
          data={data?.latestAssociated}
          rowKey="id"
          pagination={false}
          search={false}
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-black text-xl font-bold uppercase mb-2">
          Últimos desassociados
        </p>
        <TableDash
          columns={columns}
          data={data?.latestDisassociated}
          rowKey="id"
          pagination={false}
          search={false}
        />
      </div>
    </div>
  )
}

export default ApiaristAssociatesTable
