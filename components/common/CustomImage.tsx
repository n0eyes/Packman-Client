import { Skeleton } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

function CustomImage(props: Omit<ImageProps, 'onLoadingComplete'>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Skeleton animation="wave" width={props.width} height={props.height} />
      {isLoading && <Skeleton animation="wave" width={props.width} height={props.height} />}
      <Image {...props} alt="template_img" onLoadingComplete={() => setIsLoading(false)} />
    </>
  );
}

export default CustomImage;
