const { ethers } = require("ethers");
const {
  abi: QuoterAbi,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/ulMgUsGySbauQ_fQuA19NOMgOpHCXkM5"
);

const fetchPrice = async (addressFrom, addressTo, humanValue) => {
  const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    QuoterAbi,
    provider
  );
  const amountsIn = ethers.utils.parseUnits(humanValue, 18);
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    addressFrom,
    addressTo,
    3000,
    amountsIn.toString(),
    0
  );
  const amount = ethers.utils.formatUnits(quotedAmountOut.toString(), 18);
  return amount;
};

const main = async () => {
  const addressFrom = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; //WETH Address
  const addressTo = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //DAI Address

  const humanValue = "1";
  const result = await fetchPrice(addressFrom, addressTo, humanValue);
  console.log(result);
};

main();
