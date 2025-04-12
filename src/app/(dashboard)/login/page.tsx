'use client'


import api from '@/services/api'
import { ROLE } from '@/utils/types/roles'
import Cookies from 'js-cookie'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'
import { jwtDecode } from 'jwt-decode'
import Loading from '@/components/loading'
import Logo from '@/components/logo'
import InputStyled from '@/components/input'
import ButtonStyled from '@/components/button'

export default function Login() {
  const { setuser } = useContext(DefaultContext)
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setloading(true)
      setError('')
      try {
        const response = await api.post('users/auth', {
          email: values.email,
          password: values?.password,
        })

        if (response.status === 200) {
          const { data: user, token } = response?.data
          if (user && token) {
            Cookies.set('token', token, { expires: 30 })
            router.push('/dashboard')
            const decoded: any = jwtDecode(token)
            setuser(decoded as any)
          }
        } else {
          setError('Credenciais inválidas, tente novamente.')
        }
      } catch (e) {
        console.log(e)
        setError('Credenciais inválidas, tente novamente.')
      } finally {
        setloading(false)
      }
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white s:w-screen t:w-3/6 d:w-2/6 mx-auto flex flex-col justify-evenly p-4 h-screen  "
    >
      {loading && <Loading text="Autenticando..." />}
      {!loading && (
        <>
          <div>
            <Logo />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-5">
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: '#FFCB08' }} />}
              />
              <InputStyled
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Senha"
                type="password"
                placeholder="***********"
                icon={<LockOutlinedIcon style={{ color: '#FFCB08' }} />}
              />
            </div>
            {error && (
              <p className="text-center text-primary font-semibold text-sm">
                {error}
              </p>
            )}
            <button
              type="button"
              className="text-end mt-2 text-black font-bold text-sm"
              onClick={() => router.push('/accountRecovery')}
            >
              Esqueci minha senha
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <ButtonStyled
              type="submit"
              styles="w-full"
              bgColor="bg-primary"
              title="Entrar"
              textColor="text-black"
            />

            {/* <ButtonStyled
              type="button"
              onClick={() => router.push('/register')}
              styles="w-full"
              title="Cadastre-se"
            /> */}
          </div>
        </>
      )}
    </form>
  )
}
