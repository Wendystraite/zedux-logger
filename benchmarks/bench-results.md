# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 7423ms
     name                                                     hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 1,940.42   0.2732   5.9410   0.5154   0.4220   2.8731   3.4645   5.9410   ±6.15%      971   fastest   
   · zedux logger no graph                                638.73   0.9850  11.7405   1.5656   1.3633   5.2572  10.8573  11.7405   ±8.19%      320
   · zedux logger all graphs                              182.02   3.8082  19.6581   5.4940   6.2219  19.6581  19.6581  19.6581   ±6.95%       92
   · zedux logger all incremental graphs                 79.5281  10.3151  21.6300  12.5742  13.6476  21.6300  21.6300  21.6300   ±5.24%       40   slowest   
   · zedux logger only flat graph                         356.68   1.9395   6.5876   2.8036   2.4311   6.0684   6.5876   6.5876   ±6.22%      179
   · zedux logger only incremental flat graph             115.68   4.5432  20.8020   8.6448  11.5581  20.8020  20.8020  20.8020  ±12.77%       58
   · zedux logger only top down graph                     384.86   1.7738  13.6089   2.5983   2.1924   5.7900  13.6089  13.6089   ±7.60%      193
   · zedux logger only incremental top down graph         207.92   3.7792   9.6040   4.8095   4.5537   7.6893   9.6040   9.6040   ±4.90%      104
   · zedux logger only bottom up graph                    344.10   1.7530  40.2984   2.9061   2.2397  16.2362  40.2984  40.2984  ±16.97%      173
   · zedux logger only incremental bottom up graph        207.90   3.7036  10.1785   4.8101   4.5895   8.6182  10.1785  10.1785   ±5.76%      104
   · zedux logger only by namespaces graph                213.27   3.2254   7.7515   4.6890   6.0326   7.2514   7.7515   7.7515   ±5.51%      107
   · zedux logger only incremental by namespaces graph    199.95   3.8628   9.9774   5.0012   4.9551   8.3372   9.9774   9.9774   ±5.76%      101

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 1863ms
     name                               hz     min      max    mean     p75     p99    p995     p999     rme  samples
   · basic zedux logger           1,933.88  0.2776   6.6950  0.5171  0.4165  2.7976  4.6516   6.6950  ±6.68%      973   fastest
   · zedux logger grouped logs      588.93  1.0330  14.4109  1.6980  1.4113  4.9503  6.0937  14.4109  ±8.55%      296   slowest
   · zedux logger one lines logs    607.44  1.0983   5.4305  1.6462  1.3748  5.3733  5.4292   5.4305  ±7.34%      304

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 1843ms
     name                               hz     min      max    mean     p75     p99     p995     p999     rme  samples   
   · basic zedux logger           2,029.63  0.2827   6.6106  0.4927  0.4048  2.3617   4.3239   5.3053  ±6.55%     1015   fastest
   · zedux logger no deobfuscate    601.35  0.9446  11.4992  1.6629  1.3885  5.8658   8.8833  11.4992  ±8.37%      301   
   · zedux logger deobfuscate       265.88  2.5231  22.2163  3.7611  4.8915  6.6638  22.2163  22.2163  ±8.98%      133   slowest

 ✓ benchmarks/snapshots.bench.ts > snapshots 1840ms
     name                             hz     min      max    mean     p75     p99     p995     p999     rme  samples
   · basic zedux logger         2,008.76  0.2779   6.1688  0.4978  0.4058  2.8791   3.7879   5.7016  ±6.71%     1005   fastest
   · zedux logger no snapshots    599.30  0.9859  13.7284  1.6686  1.4162  7.3796  11.6983  13.7284  ±9.26%      300
   · zedux logger snapshots       483.50  1.4799  18.5015  2.0682  1.7700  4.8309   4.9619  18.5015  ±8.22%      242   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 2131ms
     name                                                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                                  1,924.63   0.2781   7.1401   0.5196   0.4217   2.8247   4.0452   7.1401  ±6.76%      963   fastest   
   · zedux logger all enabled with incremental graph      33.2820  27.1366  34.2829  30.0463  31.0268  34.2829  34.2829  34.2829  ±3.24%       17   slowest   
   · zedux logger all enabled without incremental graph   46.9631  19.6140  23.0017  21.2933  22.0236  23.0017  23.0017  23.0017  ±1.75%       24

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    40.98x faster than zedux logger all enabled without incremental graph
    57.83x faster than zedux logger all enabled with incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    3.38x faster than zedux logger no deobfuscate
    7.63x faster than zedux logger deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    3.04x faster than zedux logger no graph
    5.04x faster than zedux logger only top down graph
    5.44x faster than zedux logger only flat graph
    5.64x faster than zedux logger only bottom up graph
    9.10x faster than zedux logger only by namespaces graph
    9.33x faster than zedux logger only incremental top down graph
    9.33x faster than zedux logger only incremental bottom up graph
    9.70x faster than zedux logger only incremental by namespaces graph
    10.66x faster than zedux logger all graphs
    16.77x faster than zedux logger only incremental flat graph
    24.40x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    3.18x faster than zedux logger one lines logs
    3.28x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    3.35x faster than zedux logger no snapshots
    4.15x faster than zedux logger snapshots
```