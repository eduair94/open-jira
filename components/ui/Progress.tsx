'use client';

import { Next13ProgressBar } from 'next13-progressbar';
import { Suspense } from 'react';

export const Progress = () => (
  <Suspense>
    <Next13ProgressBar
      height="4px"
      color="#0A2FFF"
      options={{ showSpinner: true }}
      showOnShallow
    />
  </Suspense>
);
