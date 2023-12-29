import React, { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  // const [videoData, setVideoData] = useState({
  //   otp: '',
  //   playbackInfo: '',
  // });
  const params = useParams();

  console.log(params);

  const [reset, setReset] = useState(videoUrl);

  useEffect(() => {
    setReset(videoUrl);
  }, []);

  // useEffect(() => {
  //   axios
  //     .post('http://localhost:8000/api/v1/getVdoCipherOTP', {
  //       videoId: videoUrl,
  //     })
  //     .then((res) => {
  //       setVideoData(res.data);
  //     });
  // }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}
    >
      {videoUrl !== '' && (
        <iframe
          sandbox='allow-same-origin allow-scripts'
          src={`${videoUrl}`}
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow='encrypted-media'
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
