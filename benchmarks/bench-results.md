# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 7520ms
     name                                                     hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 1,885.11   0.2946   6.1749   0.5305   0.4689   2.7977   3.9840   6.1749   ±6.30%      945   fastest
   · zedux logger no graph                                577.67   0.9718  11.7143   1.7311   1.5155  10.6633  10.9680  11.7143   ±9.41%      289
   · zedux logger all graphs                              132.10   5.4664  11.2531   7.5703   8.2298  11.2531  11.2531  11.2531   ±3.54%       67
   · zedux logger all incremental graphs                 79.8139  10.1112  26.2423  12.5291  13.4439  26.2423  26.2423  26.2423   ±6.69%       40   slowest
   · zedux logger only flat graph                         245.81   2.6953   7.4552   4.0682   5.6074   7.4326   7.4552   7.4552   ±5.96%      123
   · zedux logger only incremental flat graph             108.81   4.5699  23.6525   9.1902  11.3551  23.6525  23.6525  23.6525  ±13.40%       55
   · zedux logger only top down graph                     267.52   2.2433  30.2000   3.7380   3.7968  10.5604  30.2000  30.2000  ±12.66%      134
   · zedux logger only incremental top down graph         182.39   3.6864  15.8578   5.4827   6.0621  15.8578  15.8578  15.8578   ±6.47%       92
   · zedux logger only bottom up graph                    291.47   2.2727   7.4710   3.4308   3.4047   7.0118   7.4710   7.4710   ±6.84%      146
   · zedux logger only incremental bottom up graph        192.97   3.8581  10.1662   5.1822   5.0648  10.1662  10.1662  10.1662   ±5.84%       98
   · zedux logger only by namespaces graph                131.82   4.5138  21.5526   7.5861   8.7402  21.5526  21.5526  21.5526   ±7.77%       66
   · zedux logger only incremental by namespaces graph    215.17   3.3661   9.4106   4.6475   4.5716   8.3795   9.4106   9.4106   ±5.88%      108

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 1849ms
     name                               hz     min      max    mean     p75     p99     p995     p999      rme  samples
   · basic zedux logger           1,958.70  0.2764   7.4264  0.5105  0.4251  2.8232   3.3877   7.4264   ±6.67%      980   fastest
   · zedux logger grouped logs      565.80  0.9294  22.0150  1.7674  1.5876  9.5755  12.8618  22.0150  ±11.41%      283   slowest
   · zedux logger one lines logs    657.82  1.0129   5.6777  1.5202  1.5231  4.3295   5.1502   5.6777   ±5.11%      331

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 1870ms
     name                               hz     min      max    mean     p75     p99    p995     p999     rme  samples
   · basic zedux logger           1,853.61  0.2828   7.9596  0.5395  0.4847  2.7339  3.4233   7.9596  ±6.69%      927   fastest
   · zedux logger no deobfuscate    539.14  1.1081  13.0432  1.8548  1.6763  7.3680  8.3031  13.0432  ±8.41%      270
   · zedux logger deobfuscate       224.14  3.0099   7.9885  4.4614  5.9676  7.7310  7.9885   7.9885  ±5.77%      113   slowest

 ✓ benchmarks/snapshots.bench.ts > snapshots 1844ms
     name                             hz     min      max    mean     p75     p99    p995     p999     rme  samples
   · basic zedux logger         1,904.20  0.2793   6.2319  0.5252  0.4417  2.7409  3.7442   6.2319  ±6.72%      955   fastest
   · zedux logger no snapshots    543.24  0.9982  11.7397  1.8408  1.6531  8.6522  9.6380  11.7397  ±8.84%      272
   · zedux logger snapshots       405.34  1.7169  18.8486  2.4671  2.3321  5.8921  6.8365  18.8486  ±8.13%      203   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 2089ms
     name                                                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                                  1,837.06   0.2795   8.0203   0.5443   0.4655   2.7669   3.3032   8.0203  ±6.83%      919   fastest
   · zedux logger all enabled with incremental graph      42.6796  19.1852  31.8656  23.4304  24.6849  31.8656  31.8656  31.8656  ±5.68%       22   slowest
   · zedux logger all enabled without incremental graph   54.0387  16.0697  21.5239  18.5053  19.6515  21.5239  21.5239  21.5239  ±3.23%       28

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    34.00x faster than zedux logger all enabled without incremental graph
    43.04x faster than zedux logger all enabled with incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    3.44x faster than zedux logger no deobfuscate
    8.27x faster than zedux logger deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    3.26x faster than zedux logger no graph
    6.47x faster than zedux logger only bottom up graph
    7.05x faster than zedux logger only top down graph
    7.67x faster than zedux logger only flat graph
    8.76x faster than zedux logger only incremental by namespaces graph
    9.77x faster than zedux logger only incremental bottom up graph
    10.34x faster than zedux logger only incremental top down graph
    14.27x faster than zedux logger all graphs
    14.30x faster than zedux logger only by namespaces graph
    17.32x faster than zedux logger only incremental flat graph
    23.62x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    2.98x faster than zedux logger one lines logs
    3.46x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    3.51x faster than zedux logger no snapshots
    4.70x faster than zedux logger snapshots
```