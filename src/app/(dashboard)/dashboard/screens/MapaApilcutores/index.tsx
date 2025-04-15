'use client'
import { useCallback, useState } from 'react'

import ModalApiarist from '@/components/modals/ModalApiarist'
import TopDash from '@/components/topDash'
import useLoadApiarist from '@/hooks/apiarists/useLoadApiarists'
import Apiarist from '@/interfaces/apiarist.interface'
import { colors } from '@/utils/colors/colors'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import { CircularProgress, Skeleton } from '@mui/material'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('../../../../../components/map/Map'), {ssr: false})


const MapaApicultoresContent = ({ hidden }: any) => {

  const { loadData, data, loading } = useLoadApiarist(hidden)

  return (
    <>
      <div hidden={hidden} className="w-full relative">
        <TopDash
          title="Mapa"
          description={`Mapa interativo com a distribuição geográfica dos apiários dos associados.`}
          icon={MapOutlinedIcon}
          // onClick={toggleModalOpen}
        />
        <div className="bg-white p-4 rounded-xl shadow-md">

          {loading ? (
            <>
              <Skeleton
                variant="rectangular"
                height={400}
                className="rounded-xl bg-light"
              />
            </>
          ) : (
            <LeafletMap data={data} />
          )}

        </div>
      </div>

      
    </>
  )
}

export default MapaApicultoresContent
