import useSystemFunctions from '@/hooks/useSystemFunctions';
import { DescentButton, DescentModal } from '..';
import { setBorrow, setSupply } from '@/application/menu';
import RightBox from '@/views/dashboard/right-box';

const DescentMenu = () => {
  const { dispatch, menuState } = useSystemFunctions();

  const handleSupply = () => {
    dispatch(setSupply());
  };

  const handleBorrow = () => {
    dispatch(setBorrow());
  };
  return (
    <>
      <div className="flex xl:hidden justify-center items-center gap-6 sticky bottom-0 bg-white-50 h-24 menu-shadow">
        <div className="w-36">
          <DescentButton onClick={handleSupply} variant="primary-alt" text="Deposit" />
        </div>

        <div className="w-36">
          <DescentButton onClick={handleBorrow} variant="primary-alt" text="Borrow" />
        </div>
      </div>

      {menuState.supply && (
        <DescentModal key={0} close={handleSupply}>
          <RightBox />
        </DescentModal>
      )}

      {menuState.borrow && (
        <DescentModal key={1} close={handleBorrow}>
          <RightBox active={1} />
        </DescentModal>
      )}
    </>
  );
};

export default DescentMenu;
