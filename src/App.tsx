import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Dialog from './components/Dialog/Dialog';
import InfoCard from './components/InfoCard/InfoCard';
import Input from './components/Input/Input';
import RepoCard from './components/RepoCard/RepoCard';
import Tab from './components/Tab/Tab';
import { GithubRepo, fetchGithubRepos } from './GithubAPI';
import IssuesList from './components/IssuesList';
import CommitsList from './components/CommitsList';
import SkeletonScreen from './components/SkeletonScreen/SkeletonScreen';

function App() {
  const tabsList = [
    { id: 'issues', label: 'Issues' },
    {
      id: 'commits',
      label: 'Commits',
    },
  ];
  const [showRepos, setShowRepos] = useState<GithubRepo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [errorType, setErrorType] = useState<'fatal' | 'nofatal'>('fatal');
  const [selectedTabId, setSelectedTabId] = useState(tabsList[0].id);

  const selectTab = (tabId: string) => {
    setSelectedTabId(tabId);
  };

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

  const openDialog = (repoName: string) => {
    let newlySelectedRepo = showRepos.find((repo) => repo.name === repoName);
    if (newlySelectedRepo !== undefined) {
      setSelectedRepo(newlySelectedRepo);
    }
  };

  const closeDialog = () => {
    setSelectedRepo(null);
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
          className="rouded-r-none"
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
        {isLoading === true && (
          <>
            <SkeletonScreen />
            <SkeletonScreen />
            <SkeletonScreen />
          </>
        )}
        {showRepos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} onSelect={openDialog} />
        ))}
        {errorMessage !== '' && (
          <p className={errorType === 'fatal' ? 'text-red' : 'text-yellow'}>
            {errorMessage}
          </p>
        )}
      </div>
      <Dialog open={selectedRepo !== null} onClose={closeDialog}>
        <h2 className="text-center"> {selectedRepo?.name}</h2>
        <div className="flex flex-wrap justify-between">
          <p className="m-0">
            <span className="text-bold"> Owner: </span>
            {selectedRepo?.owner.login}
          </p>
          {selectedRepo?.language !== null && (
            <p className="m-0">
              <span className="text-bold"> Language: </span>
              {selectedRepo?.language}
            </p>
          )}
          <p className="m-0">
            <span className="text-bold"> Stars: </span>
            {selectedRepo?.stargazers_count}
          </p>
          <p className="m-0">
            <span className="text-bold">Forks: </span>
            {selectedRepo?.forks_count}
          </p>
        </div>
        <Tab
          onSelected={selectTab}
          selectedTabId={selectedTabId}
          tabs={tabsList}
        ></Tab>
        {selectedRepo !== null && selectedTabId === 'issues' && (
          <IssuesList repo={selectedRepo} />
        )}
        {selectedRepo !== null && selectedTabId === 'commits' && (
          <CommitsList repo={selectedRepo} />
        )}
      </Dialog>
    </div>
  );
}

export default App;
