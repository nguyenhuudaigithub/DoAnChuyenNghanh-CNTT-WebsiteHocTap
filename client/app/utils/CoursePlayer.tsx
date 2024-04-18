// import React, { FC, useState, useEffect } from 'react';

// type Props = {
//   videoUrl: string;
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl }) => {
//   const [url, setUrl] = useState(videoUrl);

//   console.log('videoUrl', videoUrl);

//   useEffect(() => {
//     setUrl(videoUrl);
//   }, [videoUrl]);

//   return (
//     <div
//       style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}
//     >
//       {url && (
//         <iframe
//           src={`${url}`}
//           style={{
//             border: 0,
//             width: '100%',
//             height: '100%',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//           }}
//           allowFullScreen={true}
//           allow='encrypted-media'
//         ></iframe>
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: '',
    playbackInfo: '',
  });

  console.log(videoUrl);

  useEffect(() => {
    axios
      .post('http://localhost:8000/api/v1/getVdoCipherOTP', {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}
    >
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=e2GFbzbj5LpxI5HZ`}
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
