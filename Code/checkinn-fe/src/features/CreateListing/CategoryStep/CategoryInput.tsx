import React from 'react';

interface CategoryInputProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ icon, label, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-row
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <img src={icon} alt={label} style={{ width: '30px', height: '30px' }} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};

export default CategoryInput;
