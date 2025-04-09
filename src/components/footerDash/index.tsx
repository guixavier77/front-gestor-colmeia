import { colors } from '@/utils/colors/colors';
import HiveIcon from '@mui/icons-material/Hive';

const FooterDash = () => {
  return(
    <div className='bg-black col-start-3 col-end-13 h-10 flex px-4   items-center justify-between '>

      <p className='text-white font-light text-lg'>2025 - Rede Apícola <HiveIcon/></p>
      <p className='text-white font-light text-lg'>Todos os direitos reservados.</p>

    </div>
  )
}

export default FooterDash