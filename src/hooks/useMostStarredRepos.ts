import { useQuery } from 'react-query';
import axios from 'axios';

import IRepository from '../interfaces/Repository';

const getMostStarredRepositories = async ({ queryKey }) => {
  const { data } = await axios.get<IRepository[]>(
    `${process.env.API_URL}/starred_repos?language=${encodeURIComponent(queryKey[1])}`,
  );

  return data;
};

export default function useMostStarredRepositories(language: string, isEnabled: boolean) {
  return useQuery<IRepository[], Error>(
    [`${language}_most_starred_repos`, language],
    getMostStarredRepositories,
    {
      enabled: isEnabled,
    },
  );
}
