import { getAsString } from '@/utils/getAsString';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useUser } from './useUser';

export const useIsYour = () => {
  const { userId } = useUser();
  const { query } = useRouter();
  const currentPageId = getAsString(query.ID);

  const isYour: boolean = useMemo(() => userId == currentPageId, [
    userId,
    query,
  ]);

  return isYour
}
