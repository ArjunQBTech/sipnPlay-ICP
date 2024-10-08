import { Principal } from "@dfinity/principal";

const afterPaymentFlow = async (backendActor, amount) => {
  try {
    const res = await backendActor.deductMoney(amount);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error in afterPaymentFlow:", error);
    throw error;
  }
};

const formatTokenMetaData = (arr) => {
  const resultObject = {};
  arr.forEach((item) => {
    const key = item[0];
    const value = item[1][Object.keys(item[1])[0]];
    resultObject[key] = value;
  });
  return resultObject;
};

const getBalance = async (backendActor) => {
  let bal = await backendActor.get_balance();
  return parseInt(bal);
};

export const transferApprove = async (
  backendActor,
  ledgerActor,
  sendAmount
) => {
  let metaData = null;
  try {
    const metadataResponse = await ledgerActor.icrc1_metadata();
    metaData = formatTokenMetaData(metadataResponse);

    const amnt = parseInt(
      Number(sendAmount) * Math.pow(10, parseInt(metaData?.["icrc1:decimals"]))
    );

    if ((await getBalance(backendActor)) >= amnt) {
      const transaction = {
        amount: Number(amnt) + Number([metaData?.["icrc1:fee"]]),
        from_subaccount: [],
        spender: {
          owner: Principal.fromText(
            process.env.CANISTER_ID_SIPNPLAY_ICP_BACKEND
          ),
          subaccount: [],
        },
        fee: [metaData?.["icrc1:fee"]],
        memo: [],
        created_at_time: [],
        expected_allowance: [],
        expires_at: [],
      };

      const approvalResponse = await ledgerActor.icrc2_approve(transaction);

      if (approvalResponse?.Err) {
        return approvalResponse;
      } else {
        return await afterPaymentFlow(backendActor, amnt);
      }
    } else {
      console.log("balance is less : ", amnt, sendAmount);
      return { error: "Insufficient balance" };
    }
  } catch (error) {
    console.error("Error in transferApprove:", error);
    throw error;
  }
};
