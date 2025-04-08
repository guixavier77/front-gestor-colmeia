import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import SelectStyled from '@/components/GlobalComponents/select';
import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import masks from '@/utils/masks/masks';
import { ROLE, ROLE_PTBR } from '@/utils/types/roles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import WcIcon from '@mui/icons-material/Wc';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import CustomizedSteppers from '../../StepBar';

const functions = [
  {
    name: ROLE_PTBR[ROLE.ADMIN],
    value: ROLE.ADMIN
  },
  {
    name: ROLE_PTBR[ROLE.OPERATOR],
    value: ROLE.OPERATOR

  },
]



const ModalUsers = ({ open, setIsClose, userSelected }: any) => {
  const { stores, onShowFeedBack,user } = useContext(DefaultContext);
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
  
    if (!values.name) {
      errors.name = "Este campo é necessário";
    } else if (values.name.length < 4) {
      errors.name = "Minimo 4 caracteres";
    }

    if (!values.phone) {
      errors.phone = "Este campo é necessário";
    } else if (masks.unmask(values.phone).length < 11) {
      errors.phone = "Digite o telefone completo";
    }
  
    if (!values.birthDate) {
      errors.birthDate = "Este campo é necessário";
    } else if (values.birthDate.length < 10) {
      errors.birthDate = "Digite a data completa";
    }
  
    if (!userSelected) {
      if (!values.email) {
        errors.email = 'Este campo é necessário.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email inválido.';
      }
  
      if (!values.password) {
        errors.password = "Este campo é necessário.";
      } else if (values.password.length < 7) {
        errors.password = "Minímo de 7 caracteres.";
      }
    }
  

    return errors;
  }


  const optionsStores = useMemo(() => stores?.map(store => ({ value: store.id, text: store.name })), [stores])

  const options = useMemo(() => functions.map(item => ({ value: item.value, text: item.name })), [functions])

  const optionsSex = [
    { value: 'm', text: 'Masculino' },
    { value: 'f', text: 'Feminino' },
    { value: 'i', text: 'Indefinido' },
  ];

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

    if (!userSelected) {
      formik.setValues({
        cpf: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        birthDate: '',
        sex: 'm',
        storeId: optionsStores[0].value,
        role: ROLE.OPERATOR,
        active: true,
      })
    }
    if (userSelected) {
      const {
        name,
        cpf,
        email,
        phone,
        sex,
        role,
        active,
        storeId,
        birthDate,
      } = userSelected;
      formik.setValues({
        name: name,
        cpf: cpf,
        email: email,
        phone: phone,
        password: "",
        birthDate: birthDate,
        sex: sex,
        role: role,
        active,
        storeId,
      });
    }
  }, [userSelected, open])


  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      birthDate: '',
      sex: 'm',
      storeId: 0,
      role: ROLE.OPERATOR,
      active: true,
    },
    validate,
    onSubmit: async (values) => {
      setloading(true);

      const data = {
        cpf: masks.unmask(values.cpf),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        birthDate: values.birthDate,
        sex: values.sex,
        active: true,
        role: values.role,
        storeId: Number(values.storeId),
        password: values.password,
      }

      const dataUpdate = {
        id: userSelected?.id || null,
        cpf: masks.unmask(values.cpf),
        name: values.name,
        phone: masks.unmask(values.phone),
        birthDate: values.birthDate,
        sex: values.sex,
        active: true,
        role: values.role,
        storeId: Number(values.storeId),
      }

      console.log(data);
      if(userSelected) {
        api.put('users', dataUpdate)
          .then(onSuccessUpdate)
          .catch(error => onErrorUpdate(error))
          .finally(() => setloading(false));
      } else {
        api.post('users', data)
          .then(onSuccess)
          .catch(error => onError(error))
          .finally(() => setloading(false));
      }
    }
  })


  const steps = ['Dados do usuário', 'Informações de login'];

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
      <p className='font-semibold text-xl text-center uppercase pb-5'>{userSelected ? "Atualizar usuário" : "Cadastro de usuário"}</p>

        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <CustomizedSteppers 
            steps={steps}
            activeTab={!viewTwo ? 0 : 1}
            iconStep1={<PersonOutlineOutlined/>}
            iconStep2={<LockOpenIcon/>}
          />

          {!viewTwo && 
            <div className='flex flex-col gap-4'>
              <InputStyled
                id="cpf"
                onChange={formik.handleChange}
                value={masks.cpfMask(formik.values.cpf)}
                label="CPF"
                type="tel"
                placeholder="000.000.000-00"
                icon={<ArticleOutlined style={{ color: '#FFCB08' }} />}
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
                icon={<PersonOutlineOutlined style={{ color: '#FFCB08' }} />}
                error={formik.errors.name}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.name}
              />

              <InputStyled
                id="phone"
                value={masks.phoneMask(formik.values.phone)}
                onChange={formik.handleChange}
                label="Telefone"
                type="text"
                placeholder="99 9999-9999"
                maxLength={15}
                icon={<LocalPhoneIcon style={{ color: '#FFCB08' }} />}

                error={formik.errors.phone}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.phone}
              />

              <InputStyled
                id="birthDate"
                value={masks.dateMask(formik.values.birthDate)}
                onChange={formik.handleChange}
                label="Data de Nascimento"
                type="text"
                placeholder="DD/MM/YYYY"
                icon={<CalendarMonthIcon style={{ color: '#FFCB08' }} />}

                error={formik.errors.birthDate}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.birthDate}
              />

              <SelectStyled
                label="Sexo"
                icon={<WcIcon style={{ color: '#FFCB08' }} />}
                value={formik.values.sex}
                onChange={formik.handleChange}
                id="sex"
                options={optionsSex}
              />

              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={setIsClose}
                  styles="w-full"
                  bgColor='bg-yellow'
                  title="Cancelar"
                />
              
                <ButtonStyled
                  type="button"
                  onClick={() => setViewTwo(true)}
                  styles="w-full"
                  bgColor='bg-black'
                  title="Próximo"
                />
              </div>

              
            </div>
          
          }
          {viewTwo &&
            <div className='flex flex-col gap-4'>
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled={userSelected}
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: '#FFCB08' }} />}

                error={formik.errors.email}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.email}
              />

              <InputStyled
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Senha"
                type="password"
                placeholder="***********"
                disabled={userSelected}
                icon={<LockOutlinedIcon style={{ color: '#FFCB08' }} />}

                error={formik.errors.password}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.password}
              />


              <SelectStyled
                label="Função"
                icon={<AccountBoxIcon style={{ color: '#FFCB08' }} />}
                value={formik.values.role}
                onChange={formik.handleChange}
                id="role"
                options={options}
              />

              {user?.role === ROLE.SUPERADMIN &&
                <SelectStyled
                  label="Loja"
                  icon={<StoreIcon style={{ color: '#FFCB08' }} />}
                  value={formik.values.storeId}
                  onChange={formik.handleChange}
                  id="storeId"
                  options={optionsStores}
                />
              }

              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={() => setViewTwo(false)}
                  styles="w-full"
                  bgColor='bg-yellow'
                  title="Voltar"
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
                    title={userSelected ? "Atualizar" : "Cadastrar"}
                  />
                }


              </div>
            </div>
          }



        </form>
      </div>
    </Modal>
  )
}

export default ModalUsers