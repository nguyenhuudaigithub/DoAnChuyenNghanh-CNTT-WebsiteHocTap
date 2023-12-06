import React from 'react';
import { styles } from '../components/styles/style';

type Props = {};

const About = (props: Props) => {
  return (
    <div className='text-black dark:text-white'>
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        <span className='text-gradient' style={{ color: 'blue' }}>
          NETSKILL
        </span>{' '}
        LÀ GÌ ?
      </h1>

      <br />
      <div className='w-[95%] 800px:w-[85%] m-auto'>
        <p className=' text-[18px] font-Poppins'>
          Web NETSKILL rất phù hợp với những người đang học lập trình về HTML,
          CSS, HTML5, Javascript, PHP, ASP, XML và nhiều ngôn ngữ khác. NETSKILL
          có các bài hướng dẫn lập trình, tài nguyên lập trình, ví dụ, các bài
          tập để giúp bạn học code. Ở trang web này là khả năng chạy code bạn
          vừa gõ để biết chính xác mọi thứ sẽ xuất hiện như thế nào nếu dùng
          dòng code đó. Ở mỗi ngôn ngữ đề có phần Try it Yourself riêng để bạn
          rèn luyện thêm. Với NETSKILL bạn có thể yên tâm lập trình viết code
          tạm quên đi những phần mền code phức tạp mà bạn vẫn có thể đạt được sự
          hiệu quả cao.
          <br />
          <br />
          Để bắt đầu lập trình onlien với NETSKILL bạn cần chọn ngôn ngữ lập
          trình theo ý thích. Sau đó chọn các chương trình và chọn tùy chọn ngôn
          ngữ khác nhau, thiết lập các cài đặt. Và có thể bắt tay vào lập trình.
          <br />
        </p>
        <br />
        <span className='text-[22px]'>
          Học lập trình đang là xu hướng hiện nay. Mong rằng với những khóa học
          lập trình này. Bạn có thể rút ngắn thời gian học lập trình mà không
          phải quá sức tìm kiếm.
        </span>
        <br />
        <br />
        <h5 className='text-[22px] font-Poppins'> Chúc các bạn thành công.</h5>
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
