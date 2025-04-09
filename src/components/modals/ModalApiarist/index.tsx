import ButtonStyled from '@/components/button';
import InputStyled from '@/components/input';
import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import { colors } from '@/utils/colors/colors';
import PreFeedBack from '@/utils/feedbackStatus';
import masks from '@/utils/masks/masks';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import CustomizedSteppers from '../../StepBar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Apiarist from '@/interfaces/apiarist.interface';

interface ModalParams {
  open: boolean,
  setIsClose: () => void,
  apiaristSelected?: Apiarist
  loadData: () => Promise<void>;
}



const ModalApiarist = ({ open, setIsClose, apiaristSelected,loadData }: ModalParams) => {
  const { onShowFeedBack,user } = useContext(DefaultContext);
  const [loading, setloading] = useState(false);
  console.log(apiaristSelected);
  const validate = (values: any) => {
    const unmaskCpf = values.cpf.replace(/\D/g, "")
    const unmaskPhone = values.phone.replace(/\D/g, "");
    let errors: any = {};
  
    if (!values.latitude) {
      errors.latitude = 'Este campo é necessário';
    } else if (Number(values.latitude) < -90 || Number(values.latitude) > 90) {
      errors.latitude = 'Latitude deve estar entre -90 e 90';
    }
  
    if (!values.longitude) {
      errors.longitude = 'Este campo é necessário';
    } else if (Number(values.longitude) < -180 || Number(values.longitude) > 180) {
      errors.longitude = 'Longitude deve estar entre -180 e 180';
    }

    if (!values.cpf) {
      errors.cpf = 'Este campo é necessário';
    } else if (masks.cpfMask(values.cpf).length < 14) {
      errors.cpf = 'Informe o cpf completo';
    } else if (!masks.validaCpf(unmaskCpf)) {
      errors.cpf = 'CPF inválido';
    }

    console.log(values.phone);
    if (!unmaskPhone) {
      errors.phone = 'Este campo é necessário'
    } else if (unmaskPhone < 11) {
      errors.phone = 'Número inválido. Use o formato (11) 12345-6789'
    }
    
  
    if (!values.name) {
      errors.name = "Este campo é necessário";
    } else if (values.name.length < 4) {
      errors.name = "Minimo 4 caracteres";
    }

    return errors;
  }


  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Apicultor cadastrado com sucesso!'))
    setIsClose();
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Apicultor atualizado com sucesso!'))
    setIsClose();
  }
  
  const onError = (e: any) => {
    const errorMessage = e?.response?.data?.error || 'Falhou ao cadastrar apicultor.';
    onShowFeedBack(PreFeedBack.error(errorMessage));
    console.log('[ERROR API /apiarist]', errorMessage);
  };
  
  const onErrorUpdate = (e: any) => {
    const errorMessage = e?.response?.data?.error || 'Falhou ao atualizar apicultor.';
    onShowFeedBack(PreFeedBack.error(errorMessage));
    console.log('[ERROR API /apiarist]', errorMessage);
  };
  




  useEffect(() => {
    if (!open) return formik.resetForm();

    if (!apiaristSelected) {
      formik.setValues({
        cpf: '',
        name: '',
        phone: '',
        latitude: '',
        longitude: '',
        active: true,
      })
    }
    if (apiaristSelected) {
      const {
        name,
        cpf,
        phone,
        latitude,
        longitude,
        active
      } = apiaristSelected;
      formik.setValues({
        name: name,
        cpf: cpf,
        phone,
        latitude,
        longitude,
        active
      });
    }
  }, [apiaristSelected, open])


  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      phone: '',
      latitude: '',
      longitude: '',
      active: true,
    },
    validate,
    onSubmit: async (values) => {
      setloading(true);

      const data: Omit<Apiarist, 'id' | 'created_at' | 'updated_at'>
        = {
          cpf: masks.unmask(values.cpf),
          phone: masks.unmask(values.phone),
          name: values.name,
          latitude: values.latitude,
          longitude: values.longitude,
          active: values.active
          
        }

      try {
        if (apiaristSelected) {
          await api.put(`/apiarist/update/${apiaristSelected.id}`, data);
          onSuccessUpdate();
        } else {
          await api.post('/apiarist/create', data);
          onSuccess();
        }
  
        await loadData(); 
  
      } catch (error) {
        if (apiaristSelected) {
          onErrorUpdate(error);
        } else {
          onError(error);
        }
      } finally {
        setloading(false);
      }
    }
  })


  const steps = ['Dados do Apicultor'];

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 px-5 py-4'>
      <p className='font-semibold text-xl text-center uppercase pb-5'>{apiaristSelected ? "Atualizar Apicultor" : "Cadastro de Apicultor"}</p>

        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
            <CustomizedSteppers 
              steps={steps}
              activeTab={0}
              iconStep1={<PersonOutlineOutlined/>}
            />

          
            <div className='flex flex-col gap-4'>
              <InputStyled
                id="cpf"
                onChange={formik.handleChange}
                value={masks.cpfMask(formik.values.cpf)}
                label="CPF"
                type="tel"
                placeholder="000.000.000-00"
                icon={<ArticleOutlined style={{ color: colors.black }} />}
                error={formik.errors.cpf}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.cpf}
              />
              <InputStyled
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Nome"
                type="text"
                placeholder="Exemplo"
                icon={<PersonOutlineOutlined style={{ color: colors.black }} />}
                error={formik.errors.name}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.name}
              />

              <InputStyled
                id="phone"
                onChange={formik.handleChange}
                value={masks.phoneMask(formik.values.phone)}
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                icon={<LocalPhoneOutlined style={{ color: colors.black }} />}
                maxLength={15}
                error={formik.errors.phone}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.phone}

              />

              <InputStyled
                id="latitude"
                onChange={formik.handleChange}
                value={(formik.values.latitude)}
                label="Latitude"
                type="text"
                placeholder=""
                icon={<AddLocationIcon style={{ color: colors.black }} />}
                error={formik.errors.latitude}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.latitude}

              />

              <InputStyled
                id="longitude"
                onChange={formik.handleChange}
                value={(formik.values.longitude)}
                label="Longitude"
                type="text"
                placeholder=""
                icon={<AddLocationIcon style={{ color: colors.black }} />}
                error={formik.errors.longitude}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.longitude}

              />

              <div className="flex flex-row gap-2 items-center">
                <span className="text-black font-medium">Status:</span>
                <div className="flex gap-4">
                  {['Ativo', 'Inativo'].map((label) => {
                    const isActive = label === 'Ativo'
                    const selected = formik.values.active === isActive

                    return (
                      <label
                        key={label}
                        className={`px-4 py-1 rounded-40 cursor-pointer text-sm font-semibold transition-all border
                          ${selected ? (isActive ? 'bg-green text-white border-green' : 'bg-red text-white border-red')
                                    : 'bg-light text-black border-darkGray'}`}
                      >
                        <input
                          type="radio"
                          name="active"
                          value={String(isActive)}
                          checked={selected}
                          onChange={() => formik.setFieldValue('active', isActive)}
                          className="hidden"
                        />
                        {label}
                      </label>
                    )
                  })}
                </div>
              </div>



              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={setIsClose}
                  styles="w-full"
                  bgColor='bg-red'
                  title="Cancelar"
                />
              
              {loading ?
                  <ButtonStyled
                    bgColor='bg-darkGray'
                    textColor='text-white'
                    type="submit"
                    styles="w-full"
                    title='Cadastrando...'
                    icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}
  
                  /> :
                  <ButtonStyled
                    type="submit"
                    styles="w-full"
                    title={apiaristSelected ? "Atualizar" : "Cadastrar"}
                  />
  
                }
              </div>

              
            </div>
          
          
      
        </form>
      </div>
    </Modal>
  )
}

export default ModalApiarist