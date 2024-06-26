// Nội dung của khóa học
import React, { FC, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { styles } from '../../styles/style';
import { BiSolidPencil } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import toast from 'react-hot-toast';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any[];
  setCourseContentData: (courseContentData: any[]) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapse = [...isCollapsed];
    updatedCollapse[index] = !updatedCollapse[index];
    setIsCollapsed(updatedCollapse);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({
      title: '',
      url: '',
    });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === ''||
      item.videoLength === ''
    ) {
      toast.error('Vui lòng điền vào tất cả các trường trước!');
    } else {
      let newVideoSection = '';

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoLength:'',
        videoSection: newVideoSection,
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === '' ||
      courseContentData[courseContentData.length - 1].videoLength ===''
    ) {
      toast.error('Vui lòng điền vào tất cả các trường trước!');
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoLength:'',
        videoSection: `Tiều đề ${activeSection}`,
        links: [{ title: '', url: '' }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === '' ||
      courseContentData[courseContentData.length - 1].videoLength === ''
    ) {
      toast.error('Không để trống ô nhập liệu!');
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24 p-3'>
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? 'mt-10' : 'mb-0'
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className='flex w-full items-center'>
                      <input
                        type='text'
                        className={`text-[20px] ${
                          item.videoSection || 'Tiêu Đề' ? 'w-[10%]' : 'w-min'
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].videoSection = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = JSON.parse(
                            JSON.stringify(courseContentData)
                          );
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className='cursor-pointer dark:text-white text-black' />
                    </div>

                    <br />
                  </>
                )}

                <div className='flex w-full items-center justify-between my-0'>
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className='font-Poppins dark:text-white text-black'>
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* nút mũi tên cho nội dung video được thu gọn */}
                  <div className='flex items-center'>
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize='large'
                      className='dark:text-white text-black'
                      style={{
                        transform: isCollapsed[index]
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className='my-3'>
                      <label className={styles.label}>Tiêu Đề Video</label>
                      <input
                        type='text'
                        placeholder='Tiêu đề video...'
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = JSON.parse(
                            JSON.stringify(courseContentData)
                          );
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className={styles.label}>Đường Dẫn</label>
                      <input
                        type='text'
                        placeholder='sdder'
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].videoUrl = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = JSON.parse(
                            JSON.stringify(courseContentData)
                          );
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className={styles.label}>
                        Độ dài Video (phút)
                      </label>
                      <input
                        type='number'
                        placeholder='20'
                        className={`${styles.input}`}
                        value={item.videoLength}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].videoUrl = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = JSON.parse(
                            JSON.stringify(courseContentData)
                          );
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className={styles.label}>Chi Tiết Video</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder='sdder'
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].description = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = JSON.parse(
                            JSON.stringify(courseContentData)
                          );
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className='mb-3 block'>
                        <div className='w-full flex items-center justify-between'>
                          <label className={`${styles.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? 'cursor-no-drop'
                                : 'cursor-pointer'
                            }  text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type='text'
                          placeholder='Mã nguồn... (Tiêu đề liên kết)'
                          className={`${styles.input}`}
                          value={link.title}
                          // onChange={(e) => {
                          //   const updatedData = [...courseContentData];
                          //   updatedData[index].links[linkIndex].title =
                          //     e.target.value;
                          //   setCourseContentData(updatedData);
                          // }}
                          onChange={(e) => {
                            const updatedData = JSON.parse(
                              JSON.stringify(courseContentData)
                            );
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />

                        <input
                          type='url'
                          placeholder='Url mã nguồn... (URL liên kết)'
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          // onChange={(e) => {
                          //   const updatedData = [...courseContentData];
                          //   updatedData[index].links[linkIndex].url =
                          //     e.target.value;
                          //   setCourseContentData(updatedData);
                          // }}
                          onChange={(e) => {
                            const updatedData = JSON.parse(
                              JSON.stringify(courseContentData)
                            );
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
                <br />
                <div className='inline-block mb-4'>
                  <p
                    className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                    onClick={() => handleAddLink(index)}
                  >
                    <BsLink45Deg className='mr-2' /> Thêm Đường Dẫn
                  </p>
                </div>
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className='mr-2' /> Thêm Nội Dung
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className='mr-2' /> Thêm Nội Dung
        </div>
      </form>
      <br />
      <div className='w-full flex items-center justify-between'>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => prevButton()}
        >
          Trước
        </div>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => handleOptions()}
        >
          Sau
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
