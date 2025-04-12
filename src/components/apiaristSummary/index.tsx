import TableDash from '../tableDash'

interface ApiaristPeriodStats {
  totalAssociates: number
  totalDisassociated: number
}

interface ApiaristStats {
  month: ApiaristPeriodStats
  week: ApiaristPeriodStats
  year: ApiaristPeriodStats
}

const ApiaristSummaryTable = ({ data }: { data: ApiaristStats }) => {
  const associates = [
    data.week.totalAssociates,
    data.month.totalAssociates,
    data.year.totalAssociates,
  ]
  const disassociated = [
    data.week.totalDisassociated,
    data.month.totalDisassociated,
    data.year.totalDisassociated,
  ]

  const totalAssociates = associates.reduce((a, b) => a + b, 0)
  const averageAssociates = totalAssociates / associates.length

  const totalDisassociated = disassociated.reduce((a, b) => a + b, 0)
  const averageDisassociated = totalDisassociated / disassociated.length

  const summaryData = [
    {
      id: 1,
      label: 'Média de associados',
      value: averageAssociates.toFixed(2),
    },
    {
      id: 2,
      label: 'Total de associados',
      value: totalAssociates,
    },
    {
      id: 3,
      label: 'Média de desassociados',
      value: averageDisassociated.toFixed(2),
    },
    {
      id: 4,
      label: 'Total de desassociados',
      value: totalDisassociated,
    },
  ]

  const columns = [
    {
      header: 'Métrica',
      field: 'label',
    },
    {
      header: 'Valor',
      field: 'value',
    },
  ]

  return (
    <TableDash
      columns={columns}
      data={summaryData}
      rowKey="id"
      pagination={false}
      search={false}
    />
  )
}

export default ApiaristSummaryTable
