# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 27162ms
     name                                                    hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                  907.97   0.6963  16.2240   1.1014   0.9924   3.3832   4.0339  10.9473   ±3.25%     1818   fastest
   · zedux logger no graph                              60.1461  12.8883  46.7711  16.6262  16.6317  45.0931  46.7711  46.7711   ±5.49%      121
   · zedux logger all graphs                            24.7454  36.7615  49.1678  40.4115  41.6354  49.1678  49.1678  49.1678   ±1.69%       50
   · zedux logger all incremental graphs                21.5218  40.5759  52.7581  46.4645  48.0145  52.7581  52.7581  52.7581   ±1.71%       44   slowest
   · zedux logger only flat graph                       38.7897  17.6411  87.1613  25.7801  23.2341  87.1613  87.1613  87.1613  ±12.12%       78
   · zedux logger only incremental flat graph           33.8963  25.2845  39.4754  29.5017  31.3278  39.4754  39.4754  39.4754   ±2.29%       68
   · zedux logger only top down graph                   46.1388  17.6944  28.5206  21.6738  23.6636  28.5206  28.5206  28.5206   ±2.32%       93
   · zedux logger only incremental top down graph       39.5851  21.5649  32.5347  25.2620  27.7753  32.5347  32.5347  32.5347   ±2.48%       80
   · zedux logger only bottom up graph                  43.5895  18.2556  63.1672  22.9413  24.6944  63.1672  63.1672  63.1672   ±4.71%       88
   · zedux logger only incremental bottom up graph      33.4096  22.5073  77.3371  29.9315  30.9237  77.3371  77.3371  77.3371   ±8.52%       67
   · zedux logger only by namespaces graph              23.2190  36.7746  48.1180  43.0681  45.1137  48.1180  48.1180  48.1180   ±2.19%       47
   · zedux logger only incremental by namespaces graph  30.5917  26.8605  40.3720  32.6886  36.2187  40.3720  40.3720  40.3720   ±3.06%       62

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 6432ms
     name                              hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger            887.10   0.6874  18.6364   1.1273   1.0186   3.7152   4.3698  12.0126  ±3.39%     1775   fastest
   · zedux logger no deobfuscate  61.4695  13.2694  55.6326  16.2682  16.4166  51.4197  55.6326  55.6326  ±5.91%      123   slowest
   · zedux logger deobfuscate     66.3645  13.0834  20.1624  15.0683  16.2434  18.9020  20.1624  20.1624  ±1.60%      133

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6456ms
     name                              hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger            908.81   0.6729  17.4059   1.1003   0.9982   3.4719   3.9907  11.2288  ±3.28%     1818   fastest
   · zedux logger grouped logs    63.8560  12.8874  54.7833  15.6602  15.8774  44.5644  54.7833  54.7833  ±5.66%      128   slowest
   · zedux logger one lines logs  64.6569  13.0416  45.7611  15.4663  16.5484  19.3866  45.7611  45.7611  ±3.38%      130

 ✓ benchmarks/snapshots.bench.ts > snapshots 6475ms
     name                            hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger          870.02   0.6974  17.1092   1.1494   1.0750   3.8337   4.3916  11.4716  ±3.35%     1741   fastest
   · zedux logger no snapshots  64.0157  12.9264  69.3972  15.6212  15.8094  35.8233  69.3972  69.3972  ±6.08%      129
   · zedux logger snapshots     62.4627  13.5950  19.9871  16.0096  17.0580  19.8487  19.9871  19.9871  ±1.62%      125   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 6938ms
     name                                    hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                  915.92   0.6809  16.7862   1.0918   0.9876   3.3346   4.1186  11.6448  ±3.26%     1834   fastest
   · zedux logger incremental graph     20.3283  43.6761   103.74  49.1926  48.2293   103.74   103.74   103.74  ±6.40%       41   slowest
   · zedux logger no incremental graph  24.0731  37.0956  46.6111  41.5401  43.2121  46.6111  46.6111  46.6111  ±1.55%       49

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    38.05x faster than zedux logger no incremental graph
    45.06x faster than zedux logger incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    13.37x faster than zedux logger deobfuscate
    14.43x faster than zedux logger no deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    15.10x faster than zedux logger no graph
    19.68x faster than zedux logger only top down graph
    20.83x faster than zedux logger only bottom up graph
    22.94x faster than zedux logger only incremental top down graph
    23.41x faster than zedux logger only flat graph
    26.79x faster than zedux logger only incremental flat graph
    27.18x faster than zedux logger only incremental bottom up graph
    29.68x faster than zedux logger only incremental by namespaces graph
    36.69x faster than zedux logger all graphs
    39.10x faster than zedux logger only by namespaces graph
    42.19x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    14.06x faster than zedux logger one lines logs
    14.23x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    13.59x faster than zedux logger no snapshots
    13.93x faster than zedux logger snapshots
```