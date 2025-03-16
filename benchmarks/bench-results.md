# Benchmarks results

## Zedux Logger

```
 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 6451ms
     name                                     hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                 2,566.72  0.2009  10.7567   0.3896   0.3408   2.7987   3.0315   5.7299  ±3.60%     5139   fastest
   · zedux logger incremental graph      72.6509  8.2582  45.9310  13.7645  15.1186  41.8612  45.9310  45.9310  ±5.82%      147   slowest
   · zedux logger no incremental graph    138.94  4.7413  15.5112   7.1976   8.4855  12.1272  14.7026  15.5112  ±3.05%      278

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    18.47x faster than zedux logger no incremental graph
    35.33x faster than zedux logger incremental graph
```

## Graphs

```
 ✓ benchmarks/graph.bench.ts > graph 25764ms
     name                                                     hz     min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 2,572.40  0.1996  11.3234   0.3887   0.3419   2.7636   3.0384   3.8497   ±3.39%     5152   fastest
   · zedux logger no graph                                233.85  2.5963  22.7470   4.2762   5.5818  13.0372  15.3372  22.7470   ±4.66%      468
   · zedux logger all graphs                              142.35  4.4895  11.0860   7.0247   8.6221  10.6020  10.9817  11.0860   ±3.19%      285
   · zedux logger all incremental graphs                 53.8187  8.1012  35.1437  18.5809  22.5397  33.4723  35.1437  35.1437   ±7.01%      109   slowest
   · zedux logger only flat graph                         156.43  3.0094  28.8628   6.3926   8.4389  21.5133  25.7147  28.8628   ±7.35%      313
   · zedux logger only incremental flat graph            56.0913  5.3149  46.8359  17.8281  21.4242  45.8126  46.8359  46.8359   ±9.64%      113
   · zedux logger only top down graph                     175.41  2.9571  18.9326   5.7009   9.1011  10.7525  12.5138  18.9326   ±5.56%      351
   · zedux logger only incremental top down graph         126.22  3.7795  29.9542   7.9228  10.4445  25.3680  25.3982  29.9542   ±7.70%      253
   · zedux logger only bottom up graph                    173.60  2.9387  15.3973   5.7604   9.2046  11.7577  14.2642  15.3973   ±5.77%      348
   · zedux logger only incremental bottom up graph        141.42  3.8340  31.8837   7.0713  10.6895  15.1383  17.7012  31.8837   ±5.98%      285
   · zedux logger only by namespaces graph               99.3694  4.3320  63.6995  10.0635  12.1929  36.0316  63.6995  63.6995   ±9.55%      199
   · zedux logger only incremental by namespaces graph   89.2755  4.3793   112.19  11.2013  12.2077   105.40   112.19   112.19  ±19.22%      186

 BENCH  Summary

  basic zedux logger - benchmarks/graph.bench.ts > graph
    11.00x faster than zedux logger no graph
    14.67x faster than zedux logger only top down graph
    14.82x faster than zedux logger only bottom up graph
    16.44x faster than zedux logger only flat graph
    18.07x faster than zedux logger all graphs
    18.19x faster than zedux logger only incremental bottom up graph
    20.38x faster than zedux logger only incremental top down graph
    25.89x faster than zedux logger only by namespaces graph
    28.81x faster than zedux logger only incremental by namespaces graph
    45.86x faster than zedux logger only incremental flat graph
    47.80x faster than zedux logger all incremental graphs
```

## One line logs

```
 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6397ms
     name                               hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger           2,580.51  0.2032  18.8873  0.3875  0.3320   2.8339   3.0526   4.6246  ±3.89%     5207   fastest
   · zedux logger grouped logs      232.05  2.6020  18.7136  4.3093  5.7227  14.1378  14.9249  18.7136  ±4.64%      465   slowest
   · zedux logger one lines logs    241.32  2.5400   8.5956  4.1438  6.2169   8.0304   8.4442   8.5956  ±3.91%      484

 BENCH  Summary

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    10.69x faster than zedux logger one lines logs
    11.12x faster than zedux logger grouped logs
```

## Snapshots

```
 ✓ benchmarks/snapshots.bench.ts > snapshots 6374ms
     name                             hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger         2,634.21  0.2005  18.1052  0.3796  0.3335   2.7922   3.0135   4.6124  ±3.87%     5269   fastest
   · zedux logger no snapshots    234.44  2.6304  18.1342  4.2656  5.5918  13.5559  16.1393  18.1342  ±4.65%      469
   · zedux logger snapshots       223.45  2.8201  14.1070  4.4752  6.4264   8.0390   8.3698  14.1070  ±3.77%      447   slowest

 BENCH  Summary

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    11.24x faster than zedux logger no snapshots
    11.79x faster than zedux logger snapshots
```

## Deobfuscate

```
 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 6374ms
     name                               hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · basic zedux logger           2,632.20  0.2024  18.6926  0.3799  0.3306   2.7798   3.1058   4.5556  ±3.92%     5272   fastest
   · zedux logger no deobfuscate    239.83  2.5240  28.3770  4.1697  5.5215  14.5488  19.3312  28.3770  ±5.22%      480   slowest
   · zedux logger deobfuscate       249.68  2.5512   9.0284  4.0052  6.0620   7.5512   7.7345   9.0284  ±3.86%      500

 BENCH  Summary

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    10.54x faster than zedux logger deobfuscate
    10.98x faster than zedux logger no deobfuscate
```