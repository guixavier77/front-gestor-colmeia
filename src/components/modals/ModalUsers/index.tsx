import ButtonStyled from '@/components/button'
import InputStyled from '@/components/input'
import { DefaultContext } from '@/contexts/defaultContext'
import User from '@/interfaces/user.interface'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import masks from '@/utils/masks/masks'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined'
import LockIcon from '@mui/icons-material/Lock'
import PasswordIcon from '@mui/icons-material/Password'
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined'
import { CircularProgress, Modal } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { validateUser } from '../../../../formik/validators/validator-user'
import CustomizedSteppers from '../../StepBar'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  userSelected?: User | null
  loadData: () => Promise<void>
}

const ModalUsers = ({
  open,
  setIsClose,
  userSelected,
  loadData,
}: ModalParams) => {
  const { onShowFeedBack, user } = useContext(DefaultContext)
  const [viewTwo, setViewTwo] = useState(false)
  const [loading, setloading] = useState(false)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Usuário cadastrado com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Usuário atualizado com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao cadastrar usuário.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /users]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao atualizar usuário.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /users]', errorMessage)
  }

  useEffect(() => {
    if (!open) return formik.resetForm()

    if (!userSelected) {
      formik.setValues({
        cpf: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        active: true,
      })
    }
    if (userSelected) {
      const { name, cpf, phone, active, email } = userSelected
      formik.setValues({
        name: name,
        cpf: cpf,
        phone,
        active,
        password: 'passfake',
        email,
      })
    }
  }, [userSelected, open])

  const formik = useFormik({
    initialValues: {
      cpf: '',
      email: '',
      name: '',
      phone: '',
      password: '',
      active: true,
    },
    validate: validateUser,
    onSubmit: async (values) => {
      setloading(true)

      const data: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
        cpf: masks.unmask(values.cpf),
        phone: masks.unmask(values.phone),
        name: values.name,
        role: 'admin',
        active: values.active,
        email: values.email,
        password: values.password,
      }

      try {
        if (userSelected) {
          const { password, role, ...dataWithOutPassword } = data

          console.log(dataWithOutPassword)
          await api.put(`/users/update/${userSelected.id}`, dataWithOutPassword)
          onSuccessUpdate()
        } else {
          await api.post('/users/create', data)
          onSuccess()
        }

        await loadData()
      } catch (error) {
        if (userSelected) {
          onErrorUpdate(error)
        } else {
          onError(error)
        }
      } finally {
        setloading(false)
      }
    },
  })

  const steps = ['Dados do Usuário', 'Dados do Login']

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white rounded-20 px-5 py-4 w-[85%] max-w-[500px]">
        <p className="font-semibold text-xl text-center uppercase pb-5">
          {userSelected ? 'Atualizar Usuário' : 'Cadastro de Usuário'}
        </p>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <CustomizedSteppers
            steps={steps}
            activeTab={viewTwo ? 1 : 0}
            iconStep1={<PersonOutlineOutlined />}
            iconStep2={<LockIcon />}
          />

          {!viewTwo && (
            <div className="flex flex-col gap-2">
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

              <div className="flex gap-5 pt-5">
                <ButtonStyled
                  type="button"
                  onClick={setIsClose}
                  styles="w-full"
                  bgColor="bg-red"
                  title="Cancelar"
                />

                {loading ? (
                  <ButtonStyled
                    bgColor="bg-darkGray"
                    textColor="text-white"
                    type="submit"
                    styles="w-full"
                    title="Cadastrando..."
                    icon={
                      <CircularProgress
                        style={{ width: 20, height: 20, color: '#FFFFFF' }}
                      />
                    }
                  />
                ) : (
                  <ButtonStyled
                    type="button"
                    styles="w-full"
                    title={'Próximo'}
                    onClick={() => setViewTwo(true)}
                  />
                )}
              </div>
            </div>
          )}

          {viewTwo && (
            <div className="flex flex-col gap-2">
              <InputStyled
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Email"
                type="text"
                placeholder=""
                icon={<ContactMailIcon style={{ color: colors.black }} />}
                error={formik.errors.email}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.email}
                disabled={userSelected ? true : false}
              />

              <InputStyled
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Senha"
                type="password"
                placeholder=""
                icon={<PasswordIcon style={{ color: colors.black }} />}
                error={formik.errors.password}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.password}
                disabled={userSelected ? true : false}
              />

              <div className="flex flex-col gap-2 ">
                <span className="text-black font-medium">Status:</span>
                <div className="flex gap-4">
                  {['Ativo', 'Inativo'].map((label) => {
                    const isActive = label === 'Ativo'
                    const selected = formik.values.active === isActive

                    return (
                      <label
                        key={label}
                        className={`px-4 py-1 rounded-40 cursor-pointer text-sm font-semibold transition-all border
                            ${
                              selected
                                ? isActive
                                  ? 'bg-green text-white border-green'
                                  : 'bg-red text-white border-red'
                                : 'bg-light text-black border-darkGray'
                            }`}
                      >
                        <input
                          type="radio"
                          name="active"
                          value={String(isActive)}
                          checked={selected}
                          onChange={() =>
                            formik.setFieldValue('active', isActive)
                          }
                          className="hidden"
                        />
                        {label}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-5 pt-5">
                <ButtonStyled
                  type="button"
                  onClick={() => setViewTwo(false)}
                  styles="w-full"
                  bgColor="bg-red"
                  title="Cancelar"
                />

                {loading ? (
                  <ButtonStyled
                    bgColor="bg-darkGray"
                    textColor="text-white"
                    type="submit"
                    styles="w-full"
                    title="Cadastrando..."
                    icon={
                      <CircularProgress
                        style={{ width: 20, height: 20, color: '#FFFFFF' }}
                      />
                    }
                  />
                ) : (
                  <ButtonStyled
                    type="submit"
                    styles="w-full"
                    title={userSelected ? 'Atualizar' : 'Próximo'}
                  />
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </Modal>
  )
}

export default ModalUsers
