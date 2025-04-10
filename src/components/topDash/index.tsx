'use client'
import { colors } from '@/utils/colors/colors'
import ButtonStyled from '../button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
interface TopDashProps {
  title: string
  description: string
  icon: any 
  onClick?: () => void
}

const TopDash = ({ title, description, icon: Icon, onClick }: TopDashProps) => {
  return (
    <div className="flex mb-4 items-center justify-between flex-wrap gap-4">
      <div className='flex items-center '>
        <div className="flex justify-center items-center bg-primary  p-2 rounded-xl mr-4">
          <Icon style={{ color: colors.white, fontSize: 48 }} />
        </div>

        <div>
          <p className="text-black text-1xl font-bold uppercase">{title}</p>
          <p className="text-black text-sm font-light max-w-[400px]">{description}</p>
        </div>
      </div>


      {onClick &&
        <ButtonStyled 
          title={'Novo Apicultor'}
          icon={<AddIcon style={{ color: colors.primary, fontSize: 24 }} />}
          onClick={onClick}
          type='button'
          styles='px-4 text-sm h-12 '
        />
      }

      
    </div>
  )
}

export default TopDash
