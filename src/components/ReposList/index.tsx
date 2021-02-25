import useRepositories from '../../hooks/useRepositories';

const ReposList: React.FC = () => {
  const { data, isLoading } = useRepositories('javascript', 1);

  if (!data || isLoading) {
    return <span>loading...</span>
  }

  return (
    <div>
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReposList;
