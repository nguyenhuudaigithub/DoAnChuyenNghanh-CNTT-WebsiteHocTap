import React, { FC, useState, useEffect } from 'react';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [url, setUrl] = useState(videoUrl);

  console.log('videoUrl', videoUrl);

  useEffect(() => {
    setUrl(videoUrl);
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}
    >
      {url && (
        <iframe
          src={`${url}`}
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
