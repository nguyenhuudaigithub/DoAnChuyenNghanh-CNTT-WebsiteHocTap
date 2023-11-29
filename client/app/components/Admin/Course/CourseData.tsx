// Trang thứ 2 của tạo ra khóa học, nói đến lợi ích và điều kiện
import React, { FC } from 'react';
import { styles } from '../../styles/style';
import { AddCircleIcon } from '../sidebar/Icon';
import toast from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = { ...updatedBenefits[index], title: value };
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: '' }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = {
      ...updatedPrerequisites[index],
      title: value,
    };
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== '' &&
      prerequisites[prerequisites.length - 1]?.title !== ''
    ) {
      setActive(active + 1);
    } else {
      toast.error('Vui lòng điền vào các trường để chuyển đến tiếp theo!');
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24 block'>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor='email'>
          Lợi ích của học viên khi tham gia khóa học này là gì?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type='text'
            key={`benefit${index}`}
            name='Benefit'
            placeholder='Lợi ích'
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor='email'>
          Điều kiện tiên quyết đối với học viên trong khóa học này là gì?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type='text'
            key={`prerequisites${index}`}
            name='Prerequisites'
            placeholder='Điều kiện tiên quyết'
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className='w-full flex items-center justify-between'>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => prevButton()}
        >
          Trở lại
        </div>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => handleOptions()}
        >
          Tiếp tục
        </div>
      </div>
    </div>
  );
};

export default CourseData;
