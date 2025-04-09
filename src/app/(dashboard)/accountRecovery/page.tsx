'use client'
import ButtonStyled from '@/components/button'
import InputStyled from '@/components/input'
import Loading from '@/components/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { STATUS } from '@/utils/types/feedback'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import PreFeedBack from '@/utils/feedbackStatus'

export default function AccountRecovery() {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const { onShowFeedBack } = useContext(DefaultContext)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setloading(true)

      api
        .post(`users/sendEmailResetPassword/${values.email}`)
        .then(() =>
          onShowFeedBack(PreFeedBack.success('E-mail enviado com sucesso!')),
        )
        .catch((e) => onShowFeedBack(PreFeedBack.error('')))
        .finally(() => setloading(false))
    },
  })
  return (
    <main className="bg-white s:w-screen t:w-3/6 d:w-2/6 mx-auto flex flex-col justify-center p-4 h-screen relative ">
      {loading && <Loading text="Enviando e-mail..." />}
      {!loading && (
        <>
          <button className="absolute top-5 left-5">
            <ArrowBackOutlinedIcon
              style={{ fontSize: 36, color: '#FFCB08' }}
              onClick={() => router.push('/login')}
            />{' '}
          </button>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center h-full"
          >
            <div className="flex flex-col h-full justify-evenly">
              <div className="py-5">
                <h1 className="text-center text-primary font-bold text-2xl">
                  Recuperação de senha
                </h1>
                <p className="text-center mt-4">
                  Identifique-se para receber um e-mail <br />
                  com as instruções e o link para criar uma nova senha.
                </p>
                <div className="pt-5 mt-5">
                  <InputStyled
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    label="E-mail"
                    type="text"
                    placeholder="exemplo@gmail.com"
                    icon={<MailOutlineIcon style={{ color: '#FFCB08' }} />}
                  />
                </div>
              </div>
              <div>
                <div className="my-auto">
                  <ButtonStyled type="submit" styles="w-full" title="Enviar" />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </main>
  )
}
