import React from 'react';
import { Skeleton } from '@/shared/components';

export const LoadingContent: React.FC = () => {
  return (
    <>
      <Skeleton
        style={{ marginBottom: '3rem' }}
        count={2}
        height={3.5}
        space={2}
        width={33.7}
      />
      <Skeleton
        style={{ marginBottom: '3rem' }}
        count={4}
        height={2}
        space={2}
        width={33.7}
      />
      <Skeleton radius={2.5} height={5.4} width={18.3} />
    </>
  );
};
