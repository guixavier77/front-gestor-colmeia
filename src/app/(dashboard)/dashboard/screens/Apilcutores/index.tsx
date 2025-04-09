'use client'
import PaginationDash from '@/components/PaginationDash'
import { useCallback, useMemo, useState } from 'react'

import FilterDash from '@/components/filterDash'
import ModalApiarist from '@/components/modals/ModalApiarist'
import TopDash from '@/components/topDash'
import useLoadApiarist from '@/hooks/useLoadApiarists'
import { colors } from '@/utils/colors/colors'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { CircularProgress } from '@mui/material'
import TableDash from '@/components/tableDash'
import masks from '@/utils/masks/masks'


const ApicultoresContent = ({ hidden }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const {loadData, data, loading } = useLoadApiarist(hidden)

  const toggleModalOpen = useCallback(() => setOpenModal(!openModal),[openModal])

  const columns = useMemo(() => [
    {
      header: 'Nome',
      field: 'name',
    },
    {
      header: 'CPF',
      field: 'cpf',
      render: (value: any) => masks.cpfMask(value)
    },
    {
      header: 'Telefone',
      field: 'phone',
      render: (value: any) => masks.phoneMask(value ?? '00000000000')
    },
    {
      header: 'Editar',
      field: '{row}'
    }
  ],[])

  return (
    <>
      <div hidden={hidden} className="w-full relative">
        <TopDash
          title="Apicultores"
          description={`Gerenciamento dos apicultores, com dados de produção, apiários e status das colônias.`}
          icon={GroupOutlinedIcon}
        />

        <FilterDash 
          handleOpenModal={toggleModalOpen}

        />
        {loading ? (
          <>
            <div className="flex h-3/4 justify-center w-full items-center">
              <CircularProgress
                style={{ width: 80, height: 80, color: colors.primary }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-10">
              <TableDash 
                columns={columns}
                data={data}

                rowKey='id'
              />
            </div>
          </>
        )}

      </div>


      <ModalApiarist 
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
      />
    </>
  )
}

export default ApicultoresContent
