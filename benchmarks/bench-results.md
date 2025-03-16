# Benchmarks results

```

 ✓ benchmarks/graph.bench.ts > graph 29526ms
     name                                                    hz      min       max     mean      p75       p99      p995      p999      rme  samples
   · basic zedux logger                                 82.0268   1.1609   44.6269  12.1911  17.3243   34.8535   44.6269   44.6269   ±9.08%      165   fastest
   · zedux logger no graph                              24.3543   6.0889   76.6705  41.0604  54.8500   76.6705   76.6705   76.6705  ±14.02%       49
   · zedux logger all graphs                             5.1843  35.6268    466.30   192.89   298.31    466.30    466.30    466.30  ±49.34%       11   slowest
   · zedux logger all incremental graphs                 5.7422  32.6680    394.35   174.15   248.02    394.35    394.35    394.35  ±42.61%       13
   · zedux logger only flat graph                        8.5892  13.1940    332.56   116.42   193.63    332.56    332.56    332.56  ±40.05%       19
   · zedux logger only incremental flat graph            8.2763  21.1537    295.20   120.83   172.96    295.20    295.20    295.20  ±37.51%       17
   · zedux logger only top down graph                    7.6222  14.0137    453.56   131.20   193.76    453.56    453.56    453.56  ±47.98%       16
   · zedux logger only incremental top down graph        8.7153  14.8371    313.21   114.74   193.00    313.21    313.21    313.21  ±38.69%       19
   · zedux logger only bottom up graph                   9.8942  14.5110    250.28   101.07   143.33    250.28    250.28    250.28  ±33.58%       20
   · zedux logger only incremental bottom up graph       9.6792  11.4199    270.03   103.31   152.91    270.03    270.03    270.03  ±35.94%       20
   · zedux logger only by namespaces graph               5.3196  36.0914    422.52   187.98   307.07    422.52    422.52    422.52  ±46.35%       11
   · zedux logger only incremental by namespaces graph   6.1733  20.2150  1,455.26   161.99   145.10  1,455.26  1,455.26  1,455.26  ±86.77%       21

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 6668ms
     name                              hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger           82.4086  0.9671  40.6166  12.1347  17.2306  30.9436  40.6166  40.6166   ±8.73%      165   fastest
   · zedux logger no deobfuscate  23.4872  9.2592   135.56  42.5764  58.3544   135.56   135.56   135.56  ±16.12%       50   slowest
   · zedux logger deobfuscate     24.2549  7.2061  77.0893  41.2288  58.8717  77.0893  77.0893  77.0893  ±14.27%       49

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6585ms
     name                              hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger           80.8661  1.0371  39.9690  12.3661  18.1496  28.7695  39.9690  39.9690   ±8.52%      163   fastest
   · zedux logger grouped logs    23.8026  8.2266   142.55  42.0122  52.9906   142.55   142.55   142.55  ±17.85%       48   slowest
   · zedux logger one lines logs  24.0602  8.0462  83.8877  41.5625  59.8135  83.8877  83.8877  83.8877  ±14.26%       49

 ✓ benchmarks/snapshots.bench.ts > snapshots 6577ms
     name                            hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger         81.7403  1.1950  40.3483  12.2339  18.1081  33.9725  40.3483  40.3483   ±8.46%      165   fastest
   · zedux logger no snapshots  23.8956  8.5817   159.31  41.8488  54.9112   159.31   159.31   159.31  ±17.72%       48
   · zedux logger snapshots     22.0887  7.7603  89.3806  45.2720  65.9306  89.3806  89.3806  89.3806  ±16.08%       45   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 7587ms
     name                                    hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                 81.1796   1.1979  49.9412  12.3184  17.6638  30.7524  49.9412  49.9412   ±8.84%      163   fastest
   · zedux logger incremental graph      5.8549  34.7889   376.50   170.80   255.01   376.50   376.50   376.50  ±40.55%       13
   · zedux logger no incremental graph   4.9552  34.3132   442.32   201.81   325.53   442.32   442.32   442.32  ±46.46%       11   slowest

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    13.87x faster than zedux logger incremental graph
    16.38x faster than zedux logger no incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    3.40x faster than zedux logger deobfuscate
    3.51x faster than zedux logger no deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    3.37x faster than zedux logger no graph
    8.29x faster than zedux logger only bottom up graph
    8.47x faster than zedux logger only incremental bottom up graph
    9.41x faster than zedux logger only incremental top down graph
    9.55x faster than zedux logger only flat graph
    9.91x faster than zedux logger only incremental flat graph
    10.76x faster than zedux logger only top down graph
    13.29x faster than zedux logger only incremental by namespaces graph
    14.28x faster than zedux logger all incremental graphs
    15.42x faster than zedux logger only by namespaces graph
    15.82x faster than zedux logger all graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    3.36x faster than zedux logger one lines logs
    3.40x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    3.42x faster than zedux logger no snapshots
    3.70x faster than zedux logger snapshots
```