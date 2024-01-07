'use client';
import { DescentContainer } from '@/components';
import RightBox from './right-box';
import LeftBox from './left-box';
import Onboarding from './onboarding';

const DashboardView = () => {
  return (
    <>
      <DescentContainer>
        <div className="mt-10 md:mt-16 flex flex-col xl:flex-row xl:justify-between gap-12 xl:gap-16">
          <LeftBox />
          <div className="hidden xl:flex xl:w-[33%] xl:shadow-wide-box xl:p-10 xl:rounded-xl bg-white-50 shadow-wide-box self-start">
            <RightBox />
          </div>
        </div>
      </DescentContainer>

      <Onboarding />
    </>
  );
};

export default DashboardView;
