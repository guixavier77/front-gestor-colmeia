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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import useLoadUsers from '@/hooks/admins/useLoadUsers'
import ModalUsers from '@/components/modals/ModalUsers'
import User from '@/interfaces/user.interface'
import { ROLE_PTBR } from '@/utils/types/roles'
import ButtonActive from '@/components/buttonActive'

const GestoresContent = ({ hidden }: any) => {
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<User | null>(null)
  const { loadData, data, loading } = useLoadUsers(hidden)

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  const toogleModalOpenWithData = useCallback(
    (row: User) => {
      setDataSelected(row)
      setOpenModal(true)
    },
    [toggleModalOpen],
  )

  const columns = useMemo(
    () => [
      {
        header: 'Nome',
        field: 'name',
      },
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
        header: 'Função',
        field: 'role',
        render: (value: any) => ROLE_PTBR[value],
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
          title="Gestores"
          description="Gerenciamento dos gestores, responsáveis por administrar o sistema."
          icon={AdminPanelSettingsOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Gestor"
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

      <ModalUsers
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
        userSelected={dataSelected}
      />
    </>
  )
}

export default GestoresContent
