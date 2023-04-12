import { useEffect, useState } from 'react';
import { GithubIssue, GithubRepo, fetchGithubIssues } from '../GithubAPI';
import InfoCard from './InfoCard/InfoCard';
import { formatDateTime } from '../services/utils';

const IssuesList = ({ repo }: { repo: GithubRepo }) => {
  const [issues, setIssues] = useState<GithubIssue[]>([]);
  const [erroMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<'fatal' | 'nofatal'>('fatal');

  const fetchAndDisplayIssues = async () => {
    setIsLoading(true);
    try {
      const resp = await fetchGithubIssues(repo.owner.login, repo.name, 100, 1);
      if (resp.ok) {
        setIssues(resp.issues);
        setErrorMessage('');
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
  }, [repo.name]);

  return (
    <div>
      {isLoading === true && <p> loading </p>}
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
    </div>
  );
};

export default IssuesList;
