'use client'
import PaginationDash from '@/components/PaginationDash'
import { useCallback, useMemo, useState } from 'react'

import FilterDash from '@/components/filterDash'
import ModalApiarist from '@/components/modals/ModalApiarist'
import TopDash from '@/components/topDash'
import useLoadApiarist from '@/hooks/apiarists/useLoadApiarists'
import { colors } from '@/utils/colors/colors'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { CircularProgress } from '@mui/material'
import TableDash from '@/components/tableDash'
import masks from '@/utils/masks/masks'
import ButtonStyled from '@/components/button'
import EditOutlined from '@mui/icons-material/EditOutlined'
import Apiarist from '@/interfaces/apiarist.interface'
import dateFormat from 'dateformat'
import ButtonActive from '@/components/buttonActive'

const ApicultoresContent = ({ hidden }: any) => {
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Apiarist | null>(null)
  const { loadData, data, loading } = useLoadApiarist(hidden)

  const toggleModalOpen = useCallback(() => {
    setDataSelected(null)
    setOpenModal(!openModal)
  }, [openModal])

  const toogleModalOpenWithData = useCallback(
    (row: Apiarist) => {
      setDataSelected(row)
      setOpenModal(true)
    },
    [toggleModalOpen],
  )

  const columns = useMemo(
    () => [
      {
        header: 'Data Cad.',
        field: 'created_at',
        render: (value: any) =>
          value ? dateFormat(value, 'dd/mm/yyyy HH:MM') : '',
      },
      {
        header: 'Data Att',
        field: 'updated_at',
        render: (value: any) =>
          value ? dateFormat(value, 'dd/mm/yyyy HH:MM') : '',
      },
      {
        header: 'Nome',
        field: 'name',
      },
      // {
      //   header: 'E-mail',
      //   field: 'email',
      // },
      {
        header: 'CPF',
        field: 'cpf',
        render: (value: any) => masks.cpfMask(value),
      },
      {
        header: 'Telefone',
        field: 'phone',
        render: (value: any) => masks.phoneMask(value ?? '00000000000'),
      },
      {
        header: 'Latitude',
        field: 'latitude',
      },
      {
        header: 'Longitude',
        field: 'longitude',
      },
      {
        header: 'Status',
        field: 'active',
        render: (value: any) => (
          <ButtonActive 
            active={value}

          />
      
        ),
      },
      {
        header: 'Editar',
        field: '{row}',
        render: (_: any, row: any) => (
          <ButtonStyled
            onClick={() => toogleModalOpenWithData(row)}
            type="button"
            icon={<EditOutlined  style={{fontSize: 20}} />}
            styles="px-1 h-8 w-8"
            title=""
          />
        ),
      },
    ],
    [toogleModalOpenWithData],
  )

  return (
    <>
      <div hidden={hidden} className="w-full relative">
        <TopDash
          title="Apicultores"
          description={`Gerenciamento dos apicultores, com dados de produção,\n\n apiários e status das colônias.`}
          icon={GroupOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Apicultor"
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
            <TableDash columns={columns} data={data} rowKey="id" />
          </>
        )}
      </div>

      <ModalApiarist
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
        apiaristSelected={dataSelected}
      />
    </>
  )
}

export default ApicultoresContent
