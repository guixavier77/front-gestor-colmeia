import DefaultEntityType from './default'

export default interface User extends DefaultEntityType {
  cpf: string
  name: string
  phone: string
  email: string
  role: 'admin' | 'superAdmin'
  password: string
  active: boolean
}
