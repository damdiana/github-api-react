import { faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PropsWithChildren } from 'react';
import Button from '../Button/Button';
import './RepoCard.css';
import { GithubRepo } from '../../GithubAPI';

type Props = {
  repo: GithubRepo;
  onSelect: (repoName: string) => void;
};

const RepoCard = ({ repo, onSelect }: Props) => {
  const onButtonClick = () => {
    onSelect(repo.name);
  };

  return (
    <div className="repo-card">
      <a href={repo.html_url} className="repo-link">
        {repo.name}
      </a>
      <div className="repo-details__display mt-2">
        {repo.language !== null ? (
          <div className="flex align-center">
            <span className={`lng-badge lng-badge-${repo.language}`}> </span>
            <p className="text-sm m-1"> {repo.language} </p>
          </div>
        ) : (
          <div />
        )}
        <div className="flex align-center">
          <a
            href={`https://github.com/${repo.owner.login}/${repo.name}/stargazers`}
            type="button"
          >
            <FontAwesomeIcon icon={faStar} />
            <span className="text-sm m-1"> {repo.stargazers_count} </span>
          </a>
        </div>
        <div className="flex align-center">
          <a
            href={`https://github.com/${repo.owner.login}/${repo.name}/network/members`}
          >
            <FontAwesomeIcon icon={faCodeFork} />
            <span className="text-sm m-1"> {repo.forks_count} </span>
          </a>
        </div>
        <Button onClick={onButtonClick} variant="text" color="navy">
          Details
        </Button>
      </div>
    </div>
  );
};

export default RepoCard;
