const Instructions = ({
  examData,
  view,
  setView,
}: {
  examData: any;
  view: string;
  setView: any;
}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <ul className='flex-col flex gap-5 mb-7'>
        <h2 className='text-4xl underline mb-3' style={{ textAlign: 'center' }}>
          Hướng dẫn
        </h2>
        {/* <li className='text-xl'>
          Bài test phải hoàn thành{' '}
          <span className='text-yellow-400'>{examData.duration}</span> giây.
        </li>
        <li className='text-xl'>
          Bài test sẽ tự động nộp sau{' '}
          <span className='text-yellow-400'>{examData.duration}</span> giây.
        </li> */}
        <li className='text-xl'>
          Hướng dẫn là quan trọng vì chúng giúp người học hoặc người sử dụng
          hiểu rõ về cách thực hiện một công việc, sử dụng một sản phẩm, hoặc
          đạt được một mục tiêu cụ thể.
        </li>
        <li className='text-xl'>
          Bạn khởi động lại trang web thì mọi thứ sẽ bị reset.
        </li>
        <li className='text-xl'>
          Bạn có thể chọn nút <span className='font-bold'>"Trở về"</span> và{' '}
          <span className='font-bold'>"Tiếp tục"</span> để chuyển câu hỏi.
        </li>
        <li className='text-xl'>
          Tổng số câu hỏi là{' '}
          <span className='font-bold text-yellow-400'>
            {examData.totalMarks}
          </span>
        </li>
        <li className='text-xl'>
          Số điểm tối thiểu để đạt là{' '}
          <span className='font-bold text-yellow-400'>
            {examData.passingMarks}
          </span>
        </li>
        <li className='text-xl'>
          Sự nỗ lực và kiên nhẫn của bạn sẽ được đền đáp. Vì vậy hãy tiếp tục
          phát huy nhé!
        </li>
      </ul>
      <div
        style={{
          display: 'flex',
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        <button
          style={{
            borderRadius: '5px',
            padding: '1rem 8rem',
            color: 'white',
          }}
          className='bg-green-400'
          onClick={() => setView('questions')}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default Instructions;
