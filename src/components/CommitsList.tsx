import { useEffect, useState } from 'react';
import {
  GithubCommits,
  GithubIssue,
  GithubRepo,
  fetchGithubCommits,
  fetchGithubIssues,
} from '../GithubAPI';
import InfoCard from './InfoCard/InfoCard';
import { formatDateTime } from '../services/utils';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const CommitsList = ({ repo }: { repo: GithubRepo }) => {
  const [commits, setCommits] = useState<GithubCommits[]>([]);
  const [erroMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<'fatal' | 'nofatal'>('fatal');

  const fetchAndDisplayCommits = async () => {
    setIsLoading(true);
    try {
      const resp = await fetchGithubCommits(
        repo.owner.login,
        repo.name,
        100,
        1
      );
      if (resp.ok) {
        setCommits(resp.commits);
        setErrorMessage('');
      } else {
        setCommits([]);
        setErrorType('nofatal');
        setErrorMessage(resp.message);
      }
    } catch (err) {
      setCommits([]);
      setErrorType('fatal');
      setErrorMessage('Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndDisplayCommits();
  }, [repo.name]);

  return (
    <div>
      {isLoading === true && <LoadingSpinner />}
      {erroMessage !== '' && (
        <p className={errorType === 'fatal' ? 'text-red' : 'text-yellow'}>
          {erroMessage}
        </p>
      )}

      {commits.map((commit) => (
        <InfoCard
          key={commit.html_url}
          title={{
            content: commit.commit.message,
            href: commit.html_url,
          }}
          pairs={{
            '👩🏻‍💻 Author': commit.commit.author?.name ?? 'N/A',
            '📅 Date': formatDateTime(new Date(commit.commit.author?.date)),
          }}
        />
      ))}
    </div>
  );
};

export default CommitsList;
