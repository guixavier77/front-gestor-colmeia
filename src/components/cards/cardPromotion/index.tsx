import ButtonStyled from '@/components/GlobalComponents/button'
import { DefaultContext } from '@/contexts/defaultContext'
import Award from '@/interfaces/award.interface'
import Promotion from '@/interfaces/promotion.interface'
import Money from '@/utils/masks/money'
import FlagIcon from '@mui/icons-material/Flag'
import MonetizationOn from '@mui/icons-material/MonetizationOn'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import ModalPromotions from '../../modals/ModalPromotions'
import logoPng from '../../../../assets/logo.png'
import useLoadAwards from '@/hooks/useLoadAwards'

interface CardPromotionProps {
  promotion: Promotion
}

interface AwardsDictionary {
  [key: number]: Award
}

const CardPromotion: React.FC<CardPromotionProps> = ({ promotion }) => {
  const { storeSelected } = useContext(DefaultContext)
  const [awardsDicionary, setawardsDicionary] = useState<AwardsDictionary>()

  const { awards, loading } = useLoadAwards(false, storeSelected)

  useEffect(() => {
    const awardsDicionary: AwardsDictionary = {}
    awards.forEach((aw) => {
      awardsDicionary[aw.id] = {
        ...aw,
      }
    })
    setawardsDicionary(awardsDicionary)
  }, [awards])

  const [openEdit, setOpenEdit] = useState(false)
  return (
    <div className="bg-white rounded-20 shadow-lg w-60 duration-300 hover:shadow-xl relative transition-shadow">
      <div
        className={`absolute top-0 right-0 rounded-tr-20 rounded-bl-20 px-4 py-1 text-white font-bold ${promotion?.active ? 'bg-green' : 'bg-yellow'}`}
      >
        {promotion?.active ? 'Ativo' : 'Inativo'}
      </div>
      <div className="flex flex-col w-full pt-10 px-4">
        <div className="flex flex-col items-center">
          <Image
            src={
              awardsDicionary
                ? awardsDicionary[promotion.awardId]?.image
                  ? awardsDicionary[promotion.awardId]?.image
                  : logoPng
                : logoPng
            }
            alt="Imagem do prêmio"
            width={100}
            height={100}
          />
          <p className="text-center text-lg font-medium mt-4">
            {awardsDicionary
              ? awardsDicionary[promotion.awardId]?.name
              : 'Indefinido'}
          </p>
          <p className="text-center text-gray-500 font-light mt-2">
            {awardsDicionary
              ? Money.centsToMaskMoney(
                  awardsDicionary[promotion.awardId]?.price,
                )
              : Money.centsToMaskMoney(0)}
          </p>
        </div>
        <div className="flex flex-col relative">
          <p className="flex text-left text-lg font-bold items-center my-3">
            <MonetizationOn style={{ color: '#FFCB08' }} className="mr-2" />
            {promotion?.name.substring(0, 20)}
          </p>
          <p className="flex text-left text-lg font-bold items-center">
            <FlagIcon style={{ color: '#FFCB08' }} className="mr-2" />
            {promotion?.points} Pontos
          </p>
        </div>
      </div>

      <div
        className={`bg-black rounded-b-20 w-full mt-4 flex items-center justify-center`}
      >
        <ButtonStyled
          type="button"
          onClick={() => {
            setOpenEdit(true)
          }}
          styles="w-full"
          title="Editar"
        />
      </div>
      <ModalPromotions
        open={openEdit}
        setIsClose={() => setOpenEdit(false)}
        promotionEdit={promotion}
      />
    </div>
  )
}

export default CardPromotion
