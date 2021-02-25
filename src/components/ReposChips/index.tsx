import Chip from '@material-ui/core/Chip';

interface ReposChipsProps {
  languages: string[];
  handleDelete(language: string): void;
}

const ReposChips: React.FC<ReposChipsProps> = ({ languages, handleDelete }) => {
  return (
    <>
      {languages.map(language => (
        <Chip
          label={language}
          onDelete={() => handleDelete(language)}
        />
      ))}
    </>
  );
}

export default ReposChips;
