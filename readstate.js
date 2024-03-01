import { WarpFactory } from "warp-contracts";

const warp = WarpFactory.forMainnet();

async function readState() {
  const contract = warp.contract("w5ZU15Y2cLzZlu3jewauIlnzbKw-OAxbN9G5TbuuiDQ");
  await contract.readState();
}

(async () => {
  try {
    await readState();
  } catch (error) {
    console.error("Failed to read contract state:", error);
  }
})();
