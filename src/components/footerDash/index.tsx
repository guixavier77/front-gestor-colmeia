import { colors } from '@/utils/colors/colors'
import HiveIcon from '@mui/icons-material/Hive'

const FooterDash = () => {
  return (
    <footer className="bg-white shadow-top col-start-3 col-end-13 flex-wrap flex px-6 py-2 border-t border-t-gray  items-center justify-between ">
      <p className="text-black font-light text-lg">
        2025 - Rede Apícola <HiveIcon />
      </p>
      <p className="text-black font-light text-lg">
        Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default FooterDash
