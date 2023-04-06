import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import RepoCard from './components/RepoCard/RepoCard';
import { GithubRepo, fetchGithubRepos } from './GithubAPI';

function App() {
  const [showRepos, setShowRepos] = useState<GithubRepo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [errorType, setErrorType] = useState<'fatal' | 'nofatal'>('fatal');

  const getRepos = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');
    setShowRepos([]);
    setIsLoading(true);
    try {
      let githubResponse = await fetchGithubRepos(
        (e.currentTarget as HTMLFormElement).username.value
      );
      if (githubResponse.ok) {
        setShowRepos(githubResponse.repos);
      } else {
        setErrorType('nofatal');
        setErrorMessage(githubResponse.message);
      }
    } catch (err) {
      setErrorType('fatal');
      setErrorMessage('Something went wrong. Refresh and try again!');
    }
    setIsLoading(false);
    e.target.reset();
  };

  return (
    <div className="app">
      <header className="text-center">
        <h1> Search repos </h1>
      </header>
      <form onSubmit={getRepos} className="flex justify-center">
        <Input
          disabled={isLoading}
          placeholder="username"
          name="username"
          type={'search'}
          className="rounded-r-none"
        />
        <Button
          type="submit"
          variant="outline"
          color="black"
          className="bg-white rounded-l-none"
        >
          Submit
        </Button>
      </form>
      <div className="grid grid-cols-3 mt-4 gap-4 text-base text-start">
        {isLoading === true && <p> loading </p>}
        {showRepos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
        {errorMessage !== '' && (
          <p className={errorType === 'fatal' ? 'text-red' : 'text-yellow'}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
