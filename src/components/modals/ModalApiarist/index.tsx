import ButtonStyled from '@/components/button';
import InputStyled from '@/components/input';
import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import masks from '@/utils/masks/masks';
import { ROLE, ROLE_PTBR } from '@/utils/types/roles';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import CustomizedSteppers from '../../StepBar';
import { colors } from '@/utils/colors/colors';
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined';

interface ApiaristPayload {
  name: string,
  cpf: string,
  phone: string,
  id?: number
}

interface ModalParams {
  open: boolean,
  setIsClose: () => void,
  apiaristSelected?: ApiaristPayload
}



const ModalApiarist = ({ open, setIsClose, apiaristSelected }: ModalParams) => {
  const { onShowFeedBack,user } = useContext(DefaultContext);
  const [loading, setloading] = useState(false);
  const [viewTwo, setViewTwo] = useState(false);

  const validate = (values: any) => {
    const unmaskCpf = values.cpf.replace(/\D/g, "")
    let errors: any = {};
  
    if (!values.cpf) {
      errors.cpf = 'Este campo é necessário';
    } else if (masks.cpfMask(values.cpf).length < 14) {
      errors.cpf = 'Informe o cpf completo';
    } else if (!masks.validaCpf(unmaskCpf)) {
      errors.cpf = 'CPF inválido';
    }

    console.log(values);
    if (!values.phone) {
      errors.phone = 'Este campo é necessário'
    } else if (values.phone.length < 15) {
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
    onShowFeedBack(PreFeedBack.success('Usuário cadastrado com sucesso!'))
    setIsClose();
  }

  const onError = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao cadastrar usuário.'))
    console.log('[ERROR API /users]', e?.response?.data)
  }
  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Usuário atualizado com sucesso!'))
    setIsClose();
  }

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao atualizar usuário.'))
    console.log('[ERROR API /users]', e?.response?.data)
  }




  useEffect(() => {
    if (!open) return formik.resetForm();

    if (!apiaristSelected) {
      formik.setValues({
        cpf: '',
        name: '',
        phone: '',
      })
    }
    if (apiaristSelected) {
      const {
        name,
        cpf,
        phone,
       
      } = apiaristSelected;
      formik.setValues({
        name: name,
        cpf: cpf,
        phone,
       
      });
    }
  }, [apiaristSelected, open])


  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      phone: '',
     
    },
    validate,
    onSubmit: async (values) => {
      setloading(true);

      const data: ApiaristPayload = {
        cpf: masks.unmask(values.cpf),
        phone: masks.unmask(values.phone),
        name: values.name,
        
      }

  

      console.log(data);
      if(apiaristSelected) {
        data.id = apiaristSelected.id
        api.put('/apiarist/update', data)
          .then(onSuccessUpdate)
          .catch(error => onErrorUpdate(error))
          .finally(() => setloading(false));
      } else {
        api.post('/apiarist/create', data)
          .then(onSuccess)
          .catch(error => onError(error))
          .finally(() => setloading(false));
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
      <div className='bg-white rounded-20 w-1/3 p-4'>
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
                isTouched={formik.touched.name}

              />

              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={setIsClose}
                  styles="w-full"
                  bgColor='bg-red'
                  title="Cancelar"
                />
              
                <ButtonStyled
                  type="submit"
                  styles="w-full"
                  bgColor='bg-black'
                  title="Cadastrar"
                />
              </div>

              
            </div>
          
          
      
        </form>
      </div>
    </Modal>
  )
}

export default ModalApiarist