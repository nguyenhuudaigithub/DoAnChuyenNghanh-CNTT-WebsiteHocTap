// Trang đầu tiên hiện của tạo khóa học
import React, { FC, useState, useEffect } from 'react';
import { styles } from '../../styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: any) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery('Categories', {});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
 
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24'>
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor=''>Tên Khóa Học</label>
          <input
            type='name'
            name=''
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id='name'
            placeholder='Tên Khóa Học'
            className={`${styles.input}`}
          />
        </div>
        <br />

        <div className='mb-5'>
          <label className={`${styles.label}`}>Mô Tả Khóa Học</label>
          <textarea
            name=''
            id=''
            cols={30}
            rows={8}
            placeholder='Viết mô tả khóa học...'
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />

        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`}>Giá Khóa Học</label>
            <input
              type='number'
              name=''
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id='price'
              placeholder='99.000'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label className={`${styles.label} w-[50%]`}>
              Giá Ước Tính (tùy chọn)
            </label>
            <input
              type='number'
              name=''
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id='estimatedPrice'
              placeholder='179.000'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='email'>
              Thẻ Khóa Học
            </label>
            <input
              type='text'
              name=''
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id='tags'
              placeholder='MERN,Next 13,Socket io'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label className={`${styles.label}`}>Thể Loại Khóa Học</label>
            <select
              name=''
              id=''
              className={`${styles.input} `}
              value={courseInfo?.categories}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, categories: e.target.value });
              }}
            >
              <option value='' className='dark:!text-black'>
                Lựa Chọn Thể Loại
              </option>
              {categories &&
                categories.map((item: any) => (
                  <option
                    value={item?._id}
                    key={item?._id}
                    className='dark:!text-black'
                  >
                    {item?.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`}>Cấp Độ Khóa Học</label>
            <input
              type='text'
              name=''
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id='level'
              placeholder='Người mới bắt đầu / Trung cấp / Chuyên gia'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label className={`${styles.label}`}>URL Video Tổng Quan</label>
            <input
              type='text'
              name=''
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id='demoUrl'
              placeholder='eer74fd'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className='w-full'>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            id='file'
            className='hidden'
          />
          <label
            htmlFor='file'
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=''
                className='max-h-full w-full object-cover'
              />
            ) : (
              <span className='text-black dark:text-white'>
                Kéo và thả hình thu nhỏ của bạn vào đây hoặc nhấp để duyệt
              </span>
            )}
          </label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end'>
          <input
            type='submit'
            value='Tiếp tục'
            className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
