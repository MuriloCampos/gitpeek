import Head from 'next/head'
import tw from 'twin.macro'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Lottie from 'react-lottie';

import animationData from '../assets/peekAnimation.json';
import useRepositories from '../hooks/useRepositories';
import ReposList from '../components/ReposList';
import ReposChips from '../components/ReposChips';
import { languages } from '../utils/languages';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useRepositories(currentLanguage, page, currentLanguage !== '')

  const handleChange = (event: any, value: string) => {
    const language = value;

    if (languages.includes(language) && !selectedLanguages.includes(language)) {
      setCurrentLanguage(language);
      setSelectedLanguages(current => [...current, language])
      setPage(1);
    }
  }

  const handleDeleteChip = (lang: string) => {
    const index = selectedLanguages.findIndex(item => item === lang);

    if (index !== -1) {
      setSelectedLanguages(current => current.filter(item => item !== lang));
    }
  }

  const handleClickChip = (lang: string) => {
    setCurrentLanguage(lang);
  }

  return (
    <div tw="flex flex-col w-screen h-full bg-black bg-opacity-95 px-10">
      <Head>
        <title>Gitpeek</title>
      </Head>

      <Autocomplete
        id="autocomplete-input"
        options={languages}
        getOptionLabel={option => option}
        autoHighlight
        freeSolo
        blurOnSelect
        clearOnBlur
        disabled={selectedLanguages.length > 4}
        style={{
          border: 0,
          borderRadius: 8,
          padding: 8,
        }}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a language"
            margin="normal"
            variant="filled"
            style={{ backgroundColor: '#FFF', borderRadius: 8 }}
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />



      <ReposChips languages={selectedLanguages} currentLanguage={currentLanguage} handleDelete={handleDeleteChip} handleClick={handleClickChip} />

      {/* <button disabled={selectedLanguages.length < 5} tw="h-auto bg-red-400 p-3 rounded text-white disabled:bg-red-200" type="button">Peek</button> */}

      {isLoading ? (
        <Lottie
        options={defaultOptions}
        tw="h-48 w-48"
      />
      ) : (
        <>
          {data && data.items.length > 0 && selectedLanguages.length > 0 && (
            <ReposList data={data.items} />
          )}
        </>
      )}
    </div>
  )
}
