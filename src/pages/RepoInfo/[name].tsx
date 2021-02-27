import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

import IRepository from '../../interfaces/Repository';

interface RepoInfoProps {
  data: IRepository;
}

const RepoInfo: React.FC<RepoInfoProps> = ({ data }) => {
  return (
    <h1>{data.description}</h1>
  );
}

export default RepoInfo;

export const getServerSideProps: GetServerSideProps<RepoInfoProps> = async (context) => {
  const { name } =  context.query;

  const response = await axios.get(`https://api.github.com/repos/${name.replace('_', '/')}`)

  return {
    props: {
      data: response.data,
    }
  }
}
