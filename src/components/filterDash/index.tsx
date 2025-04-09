'use client'
import { TABS_FILTER } from '@/utils/types/tabs'
import Add from '@mui/icons-material/Add'

const FilterDash = ({tabs, onPressItem, tab, handleOpenModal }: any) => {
  return (
    <div className="flex justify-center w-full gap-4">
      <div className="flex bg-black justify-center rounded-xl shadow-lg w-full">
        <div className="flex justify-between w-full items-center px-10 py-2">
          {TABS_FILTER.map((item) => (
            <button
              onClick={() => onPressItem(item.value)}
              className={`${tab === item.value ? 'bg-yellow  rounded-xl ' : ''} px-6 `}
            >
              <p className="text-white text-xl font-normal">{item.name}</p>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleOpenModal}
        className="bg-black rounded-xl shadow-xl text-white px-3 flex justify-center items-center"
      >
        <Add style={{ fontSize: 36, color: '#FFCB08' }} />
      </button>
    </div>
  )
}

export default FilterDash
