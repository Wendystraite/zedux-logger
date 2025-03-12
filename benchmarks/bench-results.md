# Benchmarks results

## Zedux Logger

```
 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 6433ms
     name                                     hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                 2,479.98  0.2052  10.6731   0.4032   0.3550   2.7912   3.2360   4.8373  ±3.52%     4960   fastest
   · zedux logger incremental graph      69.5458  9.3381  54.2458  14.3790  15.0418  38.5943  54.2458  54.2458  ±6.55%      140   slowest
   · zedux logger no incremental graph    131.98  5.0189  23.3346   7.5767   8.9664  11.3748  13.7181  23.3346  ±3.20%      265

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    18.79x faster than zedux logger no incremental graph
    35.66x faster than zedux logger incremental graph
```

## Graphs

```
 ✓ benchmarks/graph.bench.ts > graph 25746ms
     name                                                     hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 2,583.30  0.2041  10.5163   0.3871   0.3410   2.8042   3.0914   3.9284   ±3.37%     5168   fastest
   · zedux logger no graph                                228.40  2.6115  24.1906   4.3782   5.7161  14.4590  19.3696  24.1906   ±5.35%      457
   · zedux logger all graphs                              145.21  4.4573  10.4724   6.8867   8.4641  10.1682  10.2703  10.4724   ±3.10%      291
   · zedux logger all incremental graphs                 53.4871  8.2721  34.7377  18.6961  21.9323  31.6837  34.7377  34.7377   ±6.73%      107   slowest
   · zedux logger only flat graph                         146.87  3.0985  27.2640   6.8086   8.7759  26.0923  26.5430  27.2640   ±7.61%      295
   · zedux logger only incremental flat graph            58.4385  4.8536  33.5855  17.1120  22.6741  32.3584  33.5855  33.5855   ±8.07%      118
   · zedux logger only top down graph                     179.97  2.9325  14.6616   5.5566   8.9462  10.4750  11.4630  14.6616   ±5.43%      360
   · zedux logger only incremental top down graph         126.35  3.9390  36.9008   7.9144  10.4606  28.5205  29.6141  36.9008   ±7.84%      254
   · zedux logger only bottom up graph                    176.23  2.9379  15.2665   5.6744   9.1714  10.7523  11.3981  15.2665   ±5.62%      353
   · zedux logger only incremental bottom up graph        129.25  3.8648  25.7389   7.7369  10.5998  24.7476  25.6676  25.7389   ±7.22%      261
   · zedux logger only by namespaces graph                113.44  4.2593  47.3792   8.8155  11.7425  22.3712  22.4345  47.3792   ±6.93%      227
   · zedux logger only incremental by namespaces graph   72.6046  4.4675   111.88  13.7732  12.5879   103.87   111.88   111.88  ±22.70%      146

 BENCH  Summary

  basic zedux logger - benchmarks/graph.bench.ts > graph
    11.31x faster than zedux logger no graph
    14.35x faster than zedux logger only top down graph
    14.66x faster than zedux logger only bottom up graph
    17.59x faster than zedux logger only flat graph
    17.79x faster than zedux logger all graphs
    19.99x faster than zedux logger only incremental bottom up graph
    20.45x faster than zedux logger only incremental top down graph
    22.77x faster than zedux logger only by namespaces graph
    35.58x faster than zedux logger only incremental by namespaces graph
    44.21x faster than zedux logger only incremental flat graph
    48.30x faster than zedux logger all incremental graphs
```

## One line logs

```
 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6455ms
     name                               hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger           2,451.76  0.2063  10.8466   0.4079   0.3517   2.8749   3.2653   5.1390  ±3.55%     4913   fastest
   · zedux logger grouped logs     67.4941  8.8653  47.1962  14.8161  15.6258  38.7187  47.1962  47.1962  ±6.67%      136
   · zedux logger one lines logs   53.5672  9.2682  31.7106  18.6682  22.5448  30.8788  31.7106  31.7106  ±6.18%      108   slowest

 BENCH  Summary

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    36.33x faster than zedux logger grouped logs
    45.77x faster than zedux logger one lines logs
```

## Snapshots

```
 ✓ benchmarks/snapshots.bench.ts > snapshots 6378ms
     name                             hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger         2,552.73  0.2021  13.1627  0.3917  0.3413   2.7785   2.9898   4.4999  ±3.63%     5106   fastest
   · zedux logger no snapshots    218.33  2.8066  22.6823  4.5803  5.8503  14.1623  20.4417  22.6823  ±5.02%      437   slowest
   · zedux logger snapshots       230.24  2.7735   8.6708  4.3434  6.3276   7.7936   7.9141   8.6708  ±3.63%      461

 BENCH  Summary

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    11.09x faster than zedux logger snapshots
    11.69x faster than zedux logger no snapshots
```
