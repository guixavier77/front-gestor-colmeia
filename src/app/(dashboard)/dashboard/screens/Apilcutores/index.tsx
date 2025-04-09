'use client'
import React, { useMemo, useState } from 'react'
import PaginationDash from '@/components/PaginationDash'
import useLoadCustomers from '@/hooks/useLoadCustomers'
import { CircularProgress } from '@mui/material'
import { colors } from '@/utils/colors/colors'
import CardCustomer from '@/components/cards/cardCustomer'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import TopDash from '@/components/topDash'
import FilterDash from '@/components/filterDash'
let itemsPerPage = 7

const ApicultoresContent = ({ hidden }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading } = useLoadCustomers(hidden)

  const numberPages = useMemo(
    () => (data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1),
    [data],
  )

  const dataDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [currentPage, data])

  return (
    <div hidden={hidden} className="w-full relative">
      <TopDash
        title="Apicultores"
        description={`Gerenciamento dos apicultores, com dados de produção, apiários e status das colônias.`}
        icon={GroupOutlinedIcon}
      />

      <FilterDash />
      {loading ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.red }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-10">
            {dataDisplay?.map((user) => (
              <>
                <CardCustomer user={user} />
              </>
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-20 mt-10 right-0">
        <PaginationDash
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ApicultoresContent
