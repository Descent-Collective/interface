import useSystemFunctions from '@/hooks/useSystemFunctions';
import { DescentButton, DescentModal } from '..';
import { setBorrow, setSupply } from '@/application/menu';
import RightBox from '@/views/dashboard/right-box';
import { useEffect } from 'react';

const DescentMenu = () => {
  const { dispatch, menuState, inputState } = useSystemFunctions();

  const { borrow, supply } = menuState;
  const { clear } = inputState;

  const handleSupply = (state: boolean) => {
    dispatch(setSupply(state));
  };

  const handleBorrow = (state: boolean) => {
    dispatch(setBorrow(state));
  };

  useEffect(() => {
    if (!clear) return;

    if (supply) {
      handleSupply(false);
    }

    if (borrow) {
      handleBorrow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  return (
    <>
      <div className="flex xl:hidden justify-center items-center gap-6 sticky bottom-0 bg-white-50 h-24 menu-shadow">
        <div className="w-36">
          <DescentButton onClick={() => handleSupply(true)} variant="primary-alt" text="Deposit" />
        </div>

        <div className="w-36">
          <DescentButton onClick={() => handleBorrow(true)} variant="primary-alt" text="Borrow" />
        </div>
      </div>

      {supply && (
        <DescentModal key={0} close={() => handleSupply(false)}>
          <RightBox />
        </DescentModal>
      )}

      {borrow && (
        <DescentModal key={1} close={() => handleBorrow(false)}>
          <RightBox active={1} />
        </DescentModal>
      )}
    </>
  );
};

export default DescentMenu;
