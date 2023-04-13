import { useEffect, useState } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  GithubCommits,
  GithubIssue,
  GithubRepo,
  fetchGithubCommits,
  fetchGithubIssues,
} from '../../GithubAPI';
import InfoCard from '../InfoCard/InfoCard';
import { formatDateTime } from '../../services/utils';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommitsList = ({ repo }: { repo: GithubRepo }) => {
  const [commits, setCommits] = useState<GithubCommits[]>([]);
  const [erroMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<'fatal' | 'nofatal'>('fatal');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const showNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const showPreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const fetchAndDisplayCommits = async () => {
    setIsLoading(true);
    try {
      const resp = await fetchGithubCommits(
        repo.owner.login,
        repo.name,
        10,
        pageNumber
      );
      if (resp.ok) {
        setCommits(resp.commits);
        setErrorMessage('');
        setHasNextPage(resp.hasNextPage);
        setHasPreviousPage(resp.hasPreviousPage);
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
  }, [repo.name, pageNumber]);

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
      {erroMessage === '' && (
        <div className="footer text-center">
          {hasPreviousPage === true && (
            <Button variant="text" color="navy" onClick={showPreviousPage}>
              <FontAwesomeIcon icon={faAngleLeft} /> Prev
            </Button>
          )}
          <span className="page-number"> {pageNumber} </span>
          {hasNextPage === true && (
            <Button variant="text" color="navy" onClick={showNextPage}>
              Next <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommitsList;
