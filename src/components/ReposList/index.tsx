import tw from 'twin.macro'
import Image from 'next/image'
import StarsIcon from '@material-ui/icons/StarsOutlined';

import IFeaturedRepository from '../../interfaces/FeaturedRepository';

interface ReposListProps {
  data: IFeaturedRepository[];
}

const ReposList: React.FC<ReposListProps> = ({ data }) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.repo}>
          <a target="_blank" rel="noopener noreferrer" href={`/RepoInfo/${item.repo.replace('/', '_')}`} tw="flex flex-col md:flex-row items-start md:items-center justify-between p-5 mb-5 rounded bg-indigo-900 transform hover:translate-x-3 transition duration-200 truncate overflow-ellipsis overflow-hidden">
            <span tw="flex flex-auto text-white text-lg">{item.repo}</span>
            <div tw="flex items-center mt-2 md:mt-0">
              <StarsIcon tw="text-white mr-1" />
              <span tw="text-white">{item.stargazers}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
