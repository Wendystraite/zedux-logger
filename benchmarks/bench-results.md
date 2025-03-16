# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 25732ms
     name                                                     hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 2,496.47  0.2039  10.8739   0.4006   0.3520   2.8595   3.1644   4.8674   ±3.54%     4993   fastest
   · zedux logger no graph                                230.33  2.5823  23.5635   4.3416   5.6409  15.7167  17.5951  23.5635   ±5.12%      461
   · zedux logger all graphs                              144.29  4.3996  10.8300   6.9304   8.5914  10.2792  10.5621  10.8300   ±3.23%      289
   · zedux logger all incremental graphs                 54.0669  7.6636  39.1853  18.4956  23.5203  33.6530  39.1853  39.1853   ±7.23%      109   slowest
   · zedux logger only flat graph                         166.60  3.0050  27.6115   6.0023   8.4052  25.2213  25.5442  27.6115   ±7.12%      334
   · zedux logger only incremental flat graph            57.0691  5.0494  32.3778  17.5226  22.3237  32.1840  32.3778  32.3778   ±7.72%      115
   · zedux logger only top down graph                     176.40  2.9311  13.6345   5.6688   9.1518  10.7212  11.7578  13.6345   ±5.52%      353
   · zedux logger only incremental top down graph         122.04  3.7498  26.7693   8.1937  10.5775  26.2901  26.5013  26.7693   ±7.72%      245
   · zedux logger only bottom up graph                    174.81  2.9047  14.1762   5.7204   9.2234  10.9531  11.6724  14.1762   ±5.60%      350
   · zedux logger only incremental bottom up graph        145.46  3.8023  33.2605   6.8746  10.4941  13.1396  13.5404  33.2605   ±5.97%      292
   · zedux logger only by namespaces graph                100.47  4.1738  52.2905   9.9531  12.0143  33.5268  44.0789  52.2905   ±9.83%      201
   · zedux logger only incremental by namespaces graph   88.7409  4.3710   111.25  11.2688  12.1105  81.8990   111.25   111.25  ±19.85%      178

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 6370ms
     name                               hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger           2,501.54  0.2044  10.3350  0.3998  0.3494   2.8426   3.0696   4.8813  ±3.47%     5004   fastest
   · zedux logger no deobfuscate    236.33  2.5720  38.1181  4.2315  5.5714  12.8897  13.6937  38.1181  ±5.18%      473   slowest
   · zedux logger deobfuscate       239.42  2.5390   8.6853  4.1767  6.2232   7.7840   8.4027   8.6853  ±3.84%      479

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6396ms
     name                               hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger           2,554.23  0.2024  11.5029  0.3915  0.3486   2.7843   3.0052   4.3752  ±3.39%     5109   fastest
   · zedux logger grouped logs      236.89  2.5280  21.5448  4.2214  5.6417  14.6457  17.9130  21.5448  ±4.67%      474   slowest
   · zedux logger one lines logs    238.22  2.5674   8.9523  4.1978  6.2248   7.8559   8.5120   8.9523  ±3.92%      477

 ✓ benchmarks/snapshots.bench.ts > snapshots 6392ms
     name                             hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger         2,501.31  0.2022  11.7862  0.3998  0.3536   2.7677   2.9270   4.0426  ±3.37%     5003   fastest
   · zedux logger no snapshots    232.30  2.5482  20.5615  4.3048  5.6402  12.5292  14.6866  20.5615  ±4.60%      466
   · zedux logger snapshots       227.89  2.7246  10.6622  4.3880  6.4077   7.8334   8.5956  10.6622  ±3.73%      456   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 6437ms
     name                                     hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                 2,500.19  0.2040  11.0046   0.4000   0.3518   2.7470   3.0495   4.5560  ±3.47%     5001   fastest
   · zedux logger incremental graph      72.6707  8.1908  44.6946  13.7607  15.3733  42.9720  44.6946  44.6946  ±5.90%      146   slowest
   · zedux logger no incremental graph    136.94  4.8503  24.8844   7.3023   8.5700  10.6957  10.8884  24.8844  ±3.25%      275

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    18.26x faster than zedux logger no incremental graph
    34.40x faster than zedux logger incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    10.45x faster than zedux logger deobfuscate
    10.59x faster than zedux logger no deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    10.84x faster than zedux logger no graph
    14.15x faster than zedux logger only top down graph
    14.28x faster than zedux logger only bottom up graph
    14.98x faster than zedux logger only flat graph
    17.16x faster than zedux logger only incremental bottom up graph
    17.30x faster than zedux logger all graphs
    20.46x faster than zedux logger only incremental top down graph
    24.85x faster than zedux logger only by namespaces graph
    28.13x faster than zedux logger only incremental by namespaces graph
    43.74x faster than zedux logger only incremental flat graph
    46.17x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    10.72x faster than zedux logger one lines logs
    10.78x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    10.77x faster than zedux logger no snapshots
    10.98x faster than zedux logger snapshots
```