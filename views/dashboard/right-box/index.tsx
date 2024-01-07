import { useState } from 'react';
import classNames from 'classnames';
import SupplyTab from './supply';
import BorrowTab from './borrow';

const RightBox = ({ active = 0 }: { active?: number }) => {
  const [activeTab, setActiveTab] = useState(active);
  const tabs = ['Deposit', 'Borrow'];

  const tabComponents = [<SupplyTab key={0} />, <BorrowTab key={1} />];
  return (
    <div className="flex flex-col gap-4 xl:gap-6 transition-all w-full">
      <div className="rounded-lg tab h-8 p-[2px] flex relative z-10">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={classNames(
              'cursor-pointer h-full flex justify-center items-center text-black-100 font-semibold text-[13px] w-1/2 transition-all duration-700 ease-in-out',
              {
                'rounded-[7px] bg-white-50 tab-shadow': index === activeTab,
              },
            )}>
            {tab}
          </div>
        ))}
      </div>

      {tabComponents[activeTab]}
    </div>
  );
};

export default RightBox;
