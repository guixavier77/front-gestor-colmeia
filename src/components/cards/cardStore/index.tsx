import Store from '@/interfaces/store.interface';
import masks from '@/utils/masks/masks';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { useCallback, useState } from 'react';
import ModalStores from '../../modals/ModalStores';


interface CardStoreProps {
  store: Store;
}



const CardStore: React.FC<CardStoreProps> = ({ store }) => {
  const [openEdit, setopenEdit] = useState(false);
  const [dataSelected, setdataSelected] = useState<Store>()
  const handleOpenEditData = useCallback((data: Store) => {
    setdataSelected(data);
    setopenEdit(true);
  }, []);

  const handleCloseEditData = useCallback(() => {
    setopenEdit(false);
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <div className={`${store.active ? 'bg-green' : 'bg-yellow'} mr-2 flex justify-normal items-center rounded-xl p-1`}>
          <StoreMallDirectoryIcon style={{ fontSize: 32, color: '#FFFFFF' }} />
        </div>
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{store.name}</p>
          <p className='font-light col-span-3'>{masks.cnpjMask(store.cnpj)}</p>
          <p className='font-light col-span-3'>{store.email}</p>
          <p className='font-light col-span-2'>{masks.phoneMask(store.phone)}</p>

          <button onClick={() => handleOpenEditData(store)} className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
        </div>
      </div>

      <ModalStores
        open={openEdit}
        setIsClose={handleCloseEditData}
        storeSelected={dataSelected}

      />
    </div>
  )
}

export default CardStore