import React from 'react'

interface IButtonStyled {
  active: boolean
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
}

const ButtonActive = ({ onClick, type, active, disabled }: IButtonStyled) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        text-black
        py-2
        px-3
        rounded-xl
        font-medium
        flex
        justify-center
        items-center
        gap-2
        hover:opacity-90ont-bold
        transition
        duration-300
      `}
    >
      <div className={`${active ? 'bg-green/50 border-green' : 'bg-red/50 border-red'} w-3 h-3 rounded-full border`} />

      <p className={`${active ? 'text-green' : 'text-red'} font-bold`}>{active ? 'Ativo' : 'Inativo'}</p>

    </button>
  )
}

export default ButtonActive
