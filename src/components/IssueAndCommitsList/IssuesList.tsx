import { useEffect, useState } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { GithubIssue, GithubRepo, fetchGithubIssues } from '../../GithubAPI';
import InfoCard from '../InfoCard/InfoCard';
import { formatDateTime } from '../../services/utils';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Button from '../Button/Button';
import './IssueAndCommits.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IssuesList = ({ repo }: { repo: GithubRepo }) => {
  const [issues, setIssues] = useState<GithubIssue[]>([]);
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

  const fetchAndDisplayIssues = async () => {
    setIsLoading(true);
    setIssues([]);
    try {
      const resp = await fetchGithubIssues(
        repo.owner.login,
        repo.name,
        10,
        pageNumber
      );
      if (resp.ok) {
        setIssues(resp.issues);
        setErrorMessage('');
        setHasNextPage(resp.hasNextPage);
        setHasPreviousPage(resp.hasPreviousPage);
      } else {
        setIssues([]);
        setErrorType('nofatal');
        setErrorMessage(resp.message);
      }
    } catch (err) {
      setIssues([]);
      setErrorType('fatal');
      setErrorMessage('Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndDisplayIssues();
  }, [repo.name, pageNumber]);

  return (
    <div>
      {isLoading === true && <LoadingSpinner />}
      {erroMessage !== '' && (
        <p className={errorType === 'fatal' ? 'text-red' : 'text-yellow'}>
          {erroMessage}
        </p>
      )}

      {issues.map((issue) => (
        <InfoCard
          key={issue.html_url}
          title={{
            content: issue.title,
            href: issue.html_url,
          }}
          pairs={{
            '🚀 Type': issue.pull_request ? 'Pull Request' : 'Issue',
            '📅 Created at': formatDateTime(new Date(issue.created_at)),
            '🛠️ State': issue.state,
            '👨🏻‍💻 Assignee': issue.assignee?.login ?? 'N/A',
            '🕥 Last updated': formatDateTime(new Date(issue.updated_at)),
            '✅ Closed at':
              issue.closed_at !== null
                ? formatDateTime(new Date(issue.closed_at))
                : 'N/A',
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

export default IssuesList;
