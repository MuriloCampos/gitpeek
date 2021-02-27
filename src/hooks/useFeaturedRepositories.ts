import { useQuery } from 'react-query';
import axios from 'axios';

import IFeaturedRepository from '../interfaces/FeaturedRepository';

interface ApiResponse {
  data: IFeaturedRepository[];
}

const getRepositories = async ({ queryKey }) => {
  const { data } = await axios.get<ApiResponse>(
    `${process.env.API_URL}/repos?language=${encodeURIComponent(queryKey[1])}&interval=${queryKey[2]}`,
  );

  return data;
};

export default function useFeaturedRepositories(language: string, interval: string, isEnabled: boolean) {
  return useQuery<ApiResponse, Error>(
    [`${language}_featured_repos`, language, interval],
    getRepositories,
    {
      enabled: isEnabled,
    },
  );
}
