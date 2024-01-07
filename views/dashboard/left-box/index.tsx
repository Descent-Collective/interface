import { InfoIcon } from '@/public/icons';
import FirstItem from './first-item';
import SecondItem from './second-item';
import ThirdItem from './third-item';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { DescentHint } from '@/components';

const LeftBox = () => {
  const { userState } = useSystemFunctions();

  const { user } = userState;

  return (
    <div className="xl:w-[65%] relative z-10">
      <FirstItem />

      <div className="mt-3 xl:mt-5 rounded-xl bg-grey-750 px-3 py-4 md:p-6">
        <div className="flex justify-between items-center xl:mt-5">
          <div className="text-[11px] md:text-base font-medium text-grey-500">Overview</div>
          <div className="flex items-center gap-1">
            <div
              className={`w-[7px] h-[7px] rounded-full ${
                user?.healthFactor === 'Safe' ? 'bg-green-50' : 'bg-red-50'
              } `}
            />
            <div className="text-[9px] md:text-sm font-medium text-grey-500">
              {user?.healthFactor === 'Safe' ? 'Healthy' : 'Unsafe'}
            </div>
          </div>
        </div>

        <SecondItem />

        <ThirdItem />
      </div>
    </div>
  );
};

export default LeftBox;
