import React, { PropsWithChildren } from 'react';
import './Tab.css';
import Button from '../Button/Button';

type Props = {
  selectedTabId: string;
  tabs: {
    id: string;
    label: string;
  }[];
  onSelected: (tabId: string) => void;
};

const TabsNavigation = ({ selectedTabId, tabs, onSelected }: Props) => {
  return (
    <div className="tabs flex">
      {tabs.map((tab) => {
        let isSelected = tab.id === selectedTabId;
        return (
          <Button
            onClick={() => onSelected(tab.id)}
            key={tab.id}
            variant="text"
            color="black"
            className={` tab ${isSelected ? 'tab--active' : ''}`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabsNavigation;
