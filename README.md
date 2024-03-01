# Protocol-Land-Cache

The PL Cache is a cache server that allows SPA apps to quickly read the state of PL contract without re-evaluating the entire history of the contract.

## API

### Sync STATE

```
GET /contract
#> { sortKey, state, validity}
```

This function enables you to sync/fetch state of Protocol Land.
