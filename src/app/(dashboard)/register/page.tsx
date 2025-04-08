'use client'
import ButtonStyled from '@/components/GlobalComponents/button'
import InputStyled from '@/components/GlobalComponents/input'
import Loading from '@/components/GlobalComponents/loading'
import SelectStyled from '@/components/GlobalComponents/select'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import masks from '@/utils/masks/masks'
import { ROLE } from '@/utils/types/roles'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WcIcon from '@mui/icons-material/Wc'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const validate = async (values: any) => {
  const unmaskCpf = values.cpf.replace(/\D/g, '')
  const errors: any = {}
  if (!values.cpf) {
    errors.cpf = 'Este campo é necessário'
  } else if (values.cpf.length < 14) {
    errors.cpf = 'Informe o cpf completo'
  } else if (!masks.validaCpf(unmaskCpf)) {
    errors.cpf = 'CPF inválido'
  }
  return errors
}

export default function Register() {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [sucessRegister, setsucessRegister] = useState(false)

  const optionsSex = [
    { value: 'm', text: 'Masculino' },
    { value: 'f', text: 'Feminino' },
    { value: 'i', text: 'Indefinido' },
  ]

  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      phone: '',
      sex: 'm',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: ROLE.CUSTOMER,
    },
    validate,
    onSubmit: async (values) => {
      setloading(true)
      const data = {
        cpf: masks.unmask(values.cpf),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        birthDate: values.birthDate,
        sex: values.sex,
        active: true,
        role: ROLE.CUSTOMER,
        storeId: null,
        password: values.password,
      }

      api
        .post('users', data)
        .then(() => setsucessRegister(true))
        .catch((error) =>
          console.error('[ERROR API /users]', error?.response?.data),
        )
        .finally(() => setloading(false))
    },
  })
  return (
    <main className="bg-white  s:w-screen t:w-3/6 d:w-2/6 mx-auto flex flex-col justify-center p-4 h-screen relative">
      {loading && <Loading text="Carregando..." />}

      {!loading && !sucessRegister && (
        <>
          <button className="absolute top-5 left-2">
            <ArrowBackOutlinedIcon
              style={{ fontSize: 36, color: colors.red }}
              onClick={() => router.push('/login')}
            />{' '}
          </button>
          <div className="text-center mt-5 pt-5">
            <PersonOutlineOutlinedIcon />
            <p className="font-bold uppercase text-lg">Cadastro</p>
          </div>
          <form className="flex flex-col h-full" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2 h-full">
              <InputStyled
                id="cpf"
                onChange={formik.handleChange}
                value={masks.cpfMask(formik.values.cpf)}
                label="CPF"
                type="tel"
                placeholder="000.000.000-00"
                icon={<ArticleOutlinedIcon style={{ color: colors.red }} />}
              />
              <InputStyled
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Nome"
                type="text"
                placeholder="Exemplo"
                icon={
                  <PersonOutlineOutlinedIcon style={{ color: colors.red }} />
                }
              />
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: colors.red }} />}
              />

              <InputStyled
                id="phone"
                value={masks.phoneMask(formik.values.phone)}
                onChange={formik.handleChange}
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                icon={<LocalPhoneOutlinedIcon style={{ color: colors.red }} />}
              />

              <InputStyled
                id="birthDate"
                value={masks.dateMask(formik.values.birthDate)}
                onChange={formik.handleChange}
                label="Data de Nascimento"
                type="tel"
                placeholder="DD/MM/YYYY"
                icon={
                  <CalendarMonthOutlinedIcon style={{ color: colors.red }} />
                }
              />

              <SelectStyled
                label="Sexo"
                icon={<WcIcon style={{ color: colors.red }} />}
                value={formik.values.sex}
                onChange={formik.handleChange}
                id="sex"
                options={optionsSex}
              />

              <InputStyled
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Senha"
                type="password"
                placeholder="***********"
                icon={<LockOutlinedIcon style={{ color: colors.red }} />}
              />
            </div>

            <div className="mt-5 py-5">
              <ButtonStyled
                type="submit"
                styles="w-full"
                bgColor="bg-yellow"
                title="Cadastrar"
              />
            </div>
          </form>
        </>
      )}

      {!loading && sucessRegister && (
        <>
          <button className="absolute top-2 left-2">
            <ArrowBackOutlinedIcon
              style={{ fontSize: 36, color: colors.red }}
              onClick={() => router.push('/login')}
            />{' '}
          </button>

          <div className="flex flex-col justify-center items-center h-screen gap-4">
            <CheckCircleIcon style={{ fontSize: 96, color: colors.red }} />

            <p className="text-yellow font-semibold text-2xl mx-4 text-center">
              Cadastro realizado com sucesso!
            </p>

            <div className="absolute bottom-10 ">
              <ButtonStyled
                type="button"
                onClick={() => router.push('/login')}
                styles="w-full px-6"
                bgColor="bg-black"
                title="FAZER LOGIN"
              />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
