import Head from 'next/head'
import tw from 'twin.macro'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import ReposList from '../components/ReposList';
import ReposChips from '../components/ReposChips';
import {languages} from '../utils/languages';

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const handleChange = (event: any, value: string) => {
    const language = value;

    if (languages.includes(language) && !selectedLanguages.includes(language)) {
      setCurrentLanguage(language);
      setSelectedLanguages(current => [...current, language])
      setPage(1);
    }
  }

  const handleDelete = (lang: string) => {
    console.log('bla')
    const index = selectedLanguages.findIndex(item => item === lang);

    if (index !== -1) {
      setSelectedLanguages(current => current.filter(item => item !== lang));
    }
  }

  return (
    <div tw="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-600">
      <Head>
        <title>Gitpeek</title>
      </Head>

      <Autocomplete
        id="autocomplete-input"
        options={languages}
        getOptionLabel={option => option}
        autoHighlight
        freeSolo
        style={{
          flex: 1,
          border: 0,
          borderRadius: 8,
          padding: 8,
        }}
        value={currentLanguage}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a language"
            margin="normal"
            variant="outlined"
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

      <ReposChips languages={selectedLanguages} handleDelete={handleDelete} />

      <ReposList />
    </div>
  )
}
