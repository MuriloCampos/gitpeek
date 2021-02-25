import tw from 'twin.macro'
import Image from 'next/image'

import IRepository from '../../interfaces/Repository';

interface ReposListProps {
  data: IRepository[];
}

const ReposList: React.FC<ReposListProps> = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <div tw="p-5 mb-5 rounded" style={{ backgroundColor: '#102A43' }}>
                <span style={{ color: '#fff' }}>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <Image
            src="/octojedi.jpeg"
            alt="No repos found"
            width={500}
            height={500}
          />

        )}
    </div>
  );
}

export default ReposList;
