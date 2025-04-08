# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 7632ms
     name                                                     hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 1,296.45   0.3992   8.1689   0.7713   0.6711   4.7573   6.7831   8.1689   ±8.40%      649   fastest
   · zedux logger no graph                                336.78   1.6188  11.9304   2.9693   3.2286  10.7594  11.9304  11.9304   ±9.60%      172
   · zedux logger all graphs                             69.6474   9.2517  20.2594  14.3580  16.7821  20.2594  20.2594  20.2594   ±7.11%       35   slowest
   · zedux logger all incremental graphs                 69.7539  10.2831  26.6586  14.3361  15.9176  26.6586  26.6586  26.6586   ±9.69%       35
   · zedux logger only flat graph                         181.99   2.9562  18.7867   5.4947   6.8774  18.7867  18.7867  18.7867  ±10.23%       91
   · zedux logger only incremental flat graph             145.72   4.7888  15.5371   6.8623   8.2973  15.5371  15.5371  15.5371   ±9.35%       73
   · zedux logger only top down graph                     221.28   2.3916  12.2094   4.5191   5.8394  10.3307  12.2094  12.2094   ±8.84%      111
   · zedux logger only incremental top down graph         167.01   4.0868  12.6182   5.9878   7.5373  12.6182  12.6182  12.6182   ±8.18%       85
   · zedux logger only bottom up graph                    179.95   2.4455  19.8829   5.5572   7.3091  19.8829  19.8829  19.8829  ±13.04%       90
   · zedux logger only incremental bottom up graph        142.38   4.1971  33.6877   7.0232   8.8225  33.6877  33.6877  33.6877  ±14.62%       72
   · zedux logger only by namespaces graph               83.8353   6.4311  19.0381  11.9282  14.3478  19.0381  19.0381  19.0381   ±8.61%       42
   · zedux logger only incremental by namespaces graph    167.81   3.8544  13.5177   5.9592   8.0295  13.5177  13.5177  13.5177   ±8.56%       85

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 1860ms
     name                               hz     min      max    mean     p75     p99     p995     p999     rme  samples
   · basic zedux logger           1,389.94  0.3993   9.3588  0.7195  0.6076  4.1395   6.9612   9.3588  ±8.30%      698   fastest
   · zedux logger grouped logs      421.56  1.1547  11.5491  2.3721  2.5352  8.7135  11.1664  11.5491  ±9.92%      211   slowest
   · zedux logger one lines logs    563.34  1.1813   5.8647  1.7751  1.9712  5.1461   5.3940   5.8647  ±6.32%      282

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 1874ms
     name                               hz     min      max    mean     p75      p99     p995     p999      rme  samples
   · basic zedux logger           1,404.38  0.3908   9.1252  0.7121  0.5810   3.5056   6.5903   9.1252   ±8.23%      703   fastest
   · zedux logger no deobfuscate    405.42  1.1481  11.1556  2.4666  2.7699  10.7069  11.1385  11.1556  ±10.84%      205
   · zedux logger deobfuscate       191.26  2.8996  14.7518  5.2284  6.4912  14.7518  14.7518  14.7518   ±8.83%       96   slowest

 ✓ benchmarks/snapshots.bench.ts > snapshots 1859ms
     name                             hz     min      max    mean     p75     p99     p995     p999      rme  samples
   · basic zedux logger         1,365.94  0.4021   8.1412  0.7321  0.6250  4.6507   6.9477   8.1412   ±8.48%      683   fastest
   · zedux logger no snapshots    431.21  1.1636  17.5306  2.3191  2.4350  9.6323  11.3527  17.5306  ±11.38%      217
   · zedux logger snapshots       346.94  1.8695  18.2319  2.8824  3.4630  7.5351  18.2319  18.2319   ±8.84%      174   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 2150ms
     name                                                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                                  1,763.30   0.2918   5.7201   0.5671   0.4950   3.7901   5.0682   5.7201  ±7.61%      882   fastest
   · zedux logger all enabled with incremental graph      39.4042  17.8984  36.2413  25.3780  28.4173  36.2413  36.2413  36.2413  ±9.53%       21
   · zedux logger all enabled without incremental graph   35.9574  19.1919  38.0584  27.8107  31.0172  38.0584  38.0584  38.0584  ±9.58%       18   slowest

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    44.75x faster than zedux logger all enabled with incremental graph
    49.04x faster than zedux logger all enabled without incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    3.46x faster than zedux logger no deobfuscate
    7.34x faster than zedux logger deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    3.85x faster than zedux logger no graph
    5.86x faster than zedux logger only top down graph
    7.12x faster than zedux logger only flat graph
    7.20x faster than zedux logger only bottom up graph
    7.73x faster than zedux logger only incremental by namespaces graph
    7.76x faster than zedux logger only incremental top down graph
    8.90x faster than zedux logger only incremental flat graph
    9.11x faster than zedux logger only incremental bottom up graph
    15.46x faster than zedux logger only by namespaces graph
    18.59x faster than zedux logger all incremental graphs
    18.61x faster than zedux logger all graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    2.47x faster than zedux logger one lines logs
    3.30x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    3.17x faster than zedux logger no snapshots
    3.94x faster than zedux logger snapshots
```