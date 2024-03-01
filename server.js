import express from "express";
import cors from "cors";
import { JSONPath } from "jsonpath-plus";

import { WarpFactory, LoggerFactory } from "warp-contracts";

LoggerFactory.INST.logLevel("fatal");
const warp = WarpFactory.forMainnet();

const app = express();

app.use(cors({ credentials: true }));

app.get("/contract", async (req, res) => {
  try {
    const result = await warp
      .contract("w5ZU15Y2cLzZlu3jewauIlnzbKw-OAxbN9G5TbuuiDQ")
      .readState();
    if (req.query.query) {
      const queryResult = JSONPath({
        path: req.query.query,
        json: result.cachedValue.state,
      });
      return res.send({
        sortKey: result.sortKey,
        result: queryResult,
        validity: result.cachedValue.validity,
        status: "evaluated",
      });
    }

    return res.send({
      sortKey: result.sortKey,
      state: result.cachedValue.state,
      validity: result.cachedValue.validity,
      errorMessages: result.cachedValue.errorMessages,
      status: "evaluated",
    });
  } catch (error) {
    res.status(404).send({ message: error?.message ?? "not found!" });
  }
});

app.get("/", async (req, res) => {
  res.send("Protocol Land Cache v1.0.0");
});

app.listen(3000);
