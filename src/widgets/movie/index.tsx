'use client';

import YouTube from 'react-youtube';

interface MovieProps {
  videoId: string;
}

export const Movie = ({ videoId }: MovieProps) => {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: '100%',
        height: '190',
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1,
        },
      }}
    />
  );
};
