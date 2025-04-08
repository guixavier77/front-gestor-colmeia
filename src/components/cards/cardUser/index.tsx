import User from '@/interfaces/user.interface';
import masks from '@/utils/masks/masks';
import { ROLE_PTBR } from '@/utils/types/roles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Person from '@mui/icons-material/Person';
import React, { useCallback, useState } from 'react';
import ModalUsers from '../../modals/ModalUsers';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import MailOutline from '@mui/icons-material/MailOutline';


interface CardUserProps {
  user: User;
}

const CardUser: React.FC<CardUserProps> = ({ user }) => {
  const [openEdit, setopenEdit] = useState(false);
  const [userSelected, setuserSelected] = useState<User>()
  const handleOpenEditUser = useCallback((user: User) => {
    setuserSelected(user);
    setopenEdit(true);
  }, []);

  const handleCloseEditUser = useCallback(() => {
    setopenEdit(false);
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <div className={`${user.active ? 'bg-green' : 'bg-yellow'} mr-2 flex justify-normal items-center rounded-xl p-1`}>
          <Person style={{ fontSize: 32, color: '#FFFFFF' }} />
        </div>
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{user.name}</p>
          <p className='font-light col-span-2 '>{masks.cpfMask(user.cpf)}</p>
          <p className='font-light col-span-4'>{user.email}</p>
          <p className='font-medium col-span-2 '>{ROLE_PTBR[user.role]}</p>
          <button onClick={() => handleOpenEditUser(user)} className='bg-black rounded-20 text-center self-end py-1'><ModeEditOutlineIcon style={{color: '#FFCB08'}}/></button>
        </div>
      </div>

      <ModalUsers
        open={openEdit}
        setIsClose={handleCloseEditUser}
        userSelected={userSelected}

      />
    </div>
  )
}

export default CardUser