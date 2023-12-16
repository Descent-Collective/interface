import { useState } from "react";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatAmount } from "@/utils";
import useCollateralActions from "@/application/collateral/actions";
import useAlertActions from "@/application/alert/actions";

const WithdrawModal = ({ close }: { close: () => void }) => {
  const { userState, collateralState } = useSystemFunctions();
  const { withdrawCollateral } = useCollateralActions();
  const { alertUser } = useAlertActions();

  const [amount, setAmount] = useState("");

  const { user } = userState;
  const { loadingWithdraw } = collateralState;

  const valid = amount.length > 0;
  const collateral = formatAmount(user?.availableCollateral);

  const handleChange = (val: string) => {
    if (!val) {
      setAmount("");
      return;
    }

    setAmount(val);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, "");

    if (Number(amountWithoutComma) > Number(user?.availableCollateral)) {
      return alertUser({
        title: "Insufficient collateral balance",
        variant: "error",
        message: "You cannot withdraw more than your available collateral",
      });
    }

    withdrawCollateral(amountWithoutComma, {
      onSuccess: () => {
        setAmount("");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Withdraw Collateral
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Withdraw your available USDC
        </div>
      </div>

      <div>
        <DescentInput
          name="amount"
          label="USDC to Withdraw"
          labelAlt={`${collateral} USDC available`}
          placeholder="0.00"
          valid={valid}
          max={() => handleChange(user?.availableCollateral)}
          onChange={(val) => setAmount(val)}
          value={amount}
        />
      </div>

      <div className="mt-2">
        <div>
          <DescentButton
            loading={loadingWithdraw}
            disabled={!valid || loadingWithdraw}
            type="submit"
            text="Continue"
          />
        </div>

        <div className="mt-4">
          <DescentButton onClick={close} variant="info" text="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default WithdrawModal;
