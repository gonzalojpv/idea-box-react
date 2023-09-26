import React from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import realTimeApi from './real-time-api';

function useRealTimeQuery<Data>(
  firebasePathKey: string,
  useQueryOptions: UseQueryOptions<Data> = {}
) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = realTimeApi.subscribe<Data>({
      path: firebasePathKey,
      callback: val => {
        queryClient.setQueryData(firebasePathKey, val);
      },
    });

    return () => unsubscribe();
  }, [queryClient, firebasePathKey]);

  return useQuery<Data, Error>(
    firebasePathKey,
    () => new Promise<Data>(() => {}),
    useQueryOptions
  );
}

export default useRealTimeQuery;
