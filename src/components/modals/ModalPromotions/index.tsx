import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import SelectStyled from '@/components/GlobalComponents/select';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/interfaces/award.interface';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FlagIcon from '@mui/icons-material/Flag';
import api from '@/services/api';
import useLoadAwards from '@/hooks/useLoadAwards';
import PreFeedBack from '@/utils/feedbackStatus';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
const ModalPromotions = ({ open, setIsClose, promotionEdit }: any) => {
  const { storeSelected,onShowFeedBack } = useContext(DefaultContext)
  const [loadingCreate, setloadingCreate] = useState(false);

  const {awards, loading} = useLoadAwards(!open, storeSelected)
  console.log(promotionEdit);

  const options = useMemo(() => awards?.map(item => ({ value: item.id, text: item.name })), [awards])


  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Prêmio cadastrado com sucesso!'))
    setIsClose();
  }

  const onError = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao cadastrar promoção.'))
    console.log('[ERROR API /awards]', e?.response?.data)
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Prêmio atualizado com sucesso!'))
    setIsClose();
  }

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao atualizar promoção.'))
    console.log('[ERROR API /awards]', e?.response?.data)
  }
  useEffect(() => {
    if (!open) return formik.resetForm();
    if (!promotionEdit && options && options?.length > 0) {
      formik.setValues({
        name: '',
        points: 0,
        pointsPerPurchase: 0,
        active: true,
        awardId: options[0]?.value,
        maxWinners: 0,
      })
    }
    if (promotionEdit) {
      const {
        name,
        points,
        awardId,
        active,
        maxWinners,
        pointsPerPurchase
      } = promotionEdit;
      formik.setValues({
        name: name,
        points: points,
        awardId: awardId,
        active,
        maxWinners,
        pointsPerPurchase: pointsPerPurchase ?? 0,
      });
    }
  }, [promotionEdit, open])

  const formik = useFormik({
    initialValues: {
      name: '',
      points: 0,
      awardId: 0,
      active: true,
      maxWinners: 0,
      pointsPerPurchase: 0,
    },
    onSubmit: async (values) => {
      setloadingCreate(true);
      const data = {
        name: values.name,
        points: Number(values.points),
        awardId: Number(values.awardId ?? options[0]?.value),
        storeId: storeSelected,
        maxWinners: Number(values.maxWinners),
        pointsPerPurchase: Number(values.pointsPerPurchase ?? 0),

      }

      const dataUpdate = {
        id: promotionEdit ? promotionEdit.id :  null,
        name: values.name,
        points: Number(values.points),
        awardId: Number(values.awardId ?? options[0]?.value),
        storeId: storeSelected,
        pointsPerPurchase: Number(values.pointsPerPurchase ?? 0),
      }
      console.log

      if (promotionEdit) {
        api.put('promotions', dataUpdate)
          .then(onSuccessUpdate)
          .catch(error => onErrorUpdate(error))
          .finally(() => setloadingCreate(false));
      } else {
        api.post('promotions', data)
        .then(onSuccess)
        .catch(error => onError(error))
        .finally(() => setloadingCreate(false));

      }
    }
  })


  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de promoção</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome"
            type="text"
            placeholder="Exemplo"
            icon={<PersonOutlineOutlined style={{ color: '#FFCB08' }} />}
          />

          <SelectStyled
            label="Prêmios"
            icon={<CardGiftcardIcon style={{ color: '#FFCB08' }} />}
            value={formik.values.awardId}
            onChange={formik.handleChange}
            id="awardId"
            options={options}
          />

          <InputStyled
            id="points"
            onChange={formik.handleChange}
            value={formik.values.points}
            label="Meta de Pontos"
            type="number"
            stylesInput='w-full'
            placeholder="Ex: 5"
            icon={<FlagIcon style={{ color: '#FFCB08' }} />}
          />
          
          <InputStyled
            id="pointsPerPurchase"
            onChange={formik.handleChange}
            value={formik.values.pointsPerPurchase}
            label="Pontos dados por compra"
            type="number"
            stylesInput='w-full'
            placeholder="Ex: 5"
            icon={<FlagIcon style={{ color: '#FFCB08' }} />}
          />

          <InputStyled
            id="maxWinners"
            onChange={formik.handleChange}
            value={formik.values.maxWinners}
            label="Máximo de vencedores"
            type="number"
            stylesInput='w-full'
            placeholder="Ex: 5"
            icon={<MilitaryTechIcon style={{ color: '#FFCB08' }} />}
          />



          <div className='flex gap-5 pt-5'>
            <ButtonStyled
              type="button"
              onClick={setIsClose}
              styles="w-full"
              bgColor='bg-yellow'
              title="Cancelar"
            />

            {loadingCreate ?
              <ButtonStyled
                bgColor='bg-darkGray'
                textColor='text-white'
                type="submit"
                styles="w-full"
                title={`${promotionEdit ? 'Atualizando...' : 'Cadastrando...'}`}
                icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}

              /> :
              <ButtonStyled
                type="submit"
                styles="w-full"
                title={`${promotionEdit ? 'Atualizar' : 'Cadastrar'}`}
              />

            }

          
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalPromotions