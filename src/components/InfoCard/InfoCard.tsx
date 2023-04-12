import React, { PropsWithChildren } from 'react';
import './InfoCard.css';

type Props = {
  title: {
    content: string;
    href: string;
  };
  pairs: Record<string, string>;
};

const InfoCard = ({ title, pairs }: Props) => {
  return (
    <div className="dialog-background text-left mb-2">
      <a href={title.href} target="_blank" className="title-hover">
        <span className="text-bold">👉🏻 Title: </span>
        <span> {title.content} </span>
      </a>
      {Object.entries(pairs).map(([category, value]) => {
        return (
          <p key={category}>
            <span className="text-bold"> {category}: </span>
            {value}
          </p>
        );
      })}
    </div>
  );
};

export default InfoCard;
