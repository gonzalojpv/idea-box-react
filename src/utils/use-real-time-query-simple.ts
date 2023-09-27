import { useEffect } from 'react';
import realTimeApi from './real-time-api';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'


function useRealTimeQuery<Data>(
  firebasePathKey: string
) {
  console.log('---1', firebasePathKey)
  const queryClient = useQueryClient();
  console.log('---2', queryClient)

  useEffect(() => {
    console.log('---4')
    const unsubscribe = realTimeApi.subscribe<Data>({
      path: firebasePathKey,
      callback: val => {
        queryClient.setQueryData(firebasePathKey, val);
      },
    });
    console.log('---5')

    return () => { console.log('-->') };
  }, [queryClient, firebasePathKey]);

  console.log('---3')

  // return useQuery<Data, Error>(
  //   firebasePathKey,
  //   () => new Promise<Data>(() => {})
  // );
  return []
}

export default useRealTimeQuery;
