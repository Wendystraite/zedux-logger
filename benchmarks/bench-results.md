# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 7661ms
     name                                                     hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                 1,363.76   0.3946   6.8542   0.7333   0.6338   5.1532   5.9002   6.8542   ±7.82%      683   fastest
   · zedux logger no graph                                449.68   1.3821   9.2320   2.2238   2.1701   6.8805   7.5658   9.2320   ±7.60%      225
   · zedux logger all graphs                              118.99   5.3156  22.4380   8.4040   9.6963  22.4380  22.4380  22.4380   ±8.46%       60
   · zedux logger all incremental graphs                 52.5665  14.6393  25.9454  19.0235  21.6265  25.9454  25.9454  25.9454   ±6.95%       27   slowest
   · zedux logger only flat graph                         273.83   1.9303  30.6465   3.6519   4.4079   9.8049  30.6465  30.6465  ±13.09%      137
   · zedux logger only incremental flat graph             151.33   4.6023  12.3652   6.6081   7.8393  12.3652  12.3652  12.3652   ±7.24%       76
   · zedux logger only top down graph                     323.43   1.8130   8.6924   3.0919   4.1340   8.5276   8.6924   8.6924   ±8.12%      162
   · zedux logger only incremental top down graph         178.30   3.7535  15.6601   5.6085   7.2511  15.6601  15.6601  15.6601   ±8.33%       90
   · zedux logger only bottom up graph                    249.18   1.7509  19.9420   4.0132   4.4750  18.9223  19.9420  19.9420  ±13.13%      129
   · zedux logger only incremental bottom up graph        152.79   3.6796  19.8430   6.5451   8.2021  19.8430  19.8430  19.8430  ±10.69%       77
   · zedux logger only by namespaces graph                195.87   3.3267  17.6079   5.1055   6.0873  17.6079  17.6079  17.6079   ±8.72%       98
   · zedux logger only incremental by namespaces graph    159.67   3.9069  45.9848   6.2630   7.2877  45.9848  45.9848  45.9848  ±18.27%       80

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 1858ms
     name                               hz     min      max    mean     p75     p99     p995     p999      rme  samples
   · basic zedux logger           1,407.07  0.3882   5.9957  0.7107  0.6142  4.3702   5.8387   5.9957   ±7.77%      704   fastest
   · zedux logger grouped logs      488.02  0.9511  11.3092  2.0491  1.8276  9.7933  10.3580  11.3092  ±10.39%      246   slowest
   · zedux logger one lines logs    557.02  1.0308  15.3518  1.7953  2.1590  5.3919   5.4616  15.3518   ±8.13%      279

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 1864ms
     name                               hz     min      max    mean     p75      p99     p995     p999      rme  samples
   · basic zedux logger           1,394.15  0.3928   8.9852  0.7173  0.6259   4.0070   5.1006   8.9852   ±7.51%      699   fastest
   · zedux logger no deobfuscate    492.10  0.9757  17.1113  2.0321  2.2080   7.4790  10.0929  17.1113  ±10.26%      247
   · zedux logger deobfuscate       258.64  2.5370  14.0618  3.8664  5.2844  13.0351  14.0618  14.0618   ±8.23%      130   slowest

 ✓ benchmarks/snapshots.bench.ts > snapshots 1846ms
     name                             hz     min      max    mean     p75     p99     p995     p999      rme  samples
   · basic zedux logger         1,914.02  0.2898  13.9204  0.5225  0.3883  3.0381   4.7413  13.9204   ±8.99%      959   fastest
   · zedux logger no snapshots    573.83  0.9753  12.1128  1.7427  1.4310  9.3013  11.5793  12.1128  ±10.08%      287
   · zedux logger snapshots       477.60  1.4772  20.0646  2.0938  1.6609  6.2645   6.3627  20.0646   ±9.58%      239   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 2160ms
     name                                                      hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                  1,341.58   0.3841   8.6236   0.7454   0.6063   5.6350   6.9558   8.6236   ±8.96%      671   fastest
   · zedux logger all enabled with incremental graph      27.4315  27.9346  42.6874  36.4545  38.4571  42.6874  42.6874  42.6874   ±6.55%       14   slowest
   · zedux logger all enabled without incremental graph   35.9028  20.0732  73.6078  27.8530  27.6724  73.6078  73.6078  73.6078  ±21.16%       18

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    37.37x faster than zedux logger all enabled without incremental graph
    48.91x faster than zedux logger all enabled with incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    2.83x faster than zedux logger no deobfuscate
    5.39x faster than zedux logger deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    3.03x faster than zedux logger no graph
    4.22x faster than zedux logger only top down graph
    4.98x faster than zedux logger only flat graph
    5.47x faster than zedux logger only bottom up graph
    6.96x faster than zedux logger only by namespaces graph
    7.65x faster than zedux logger only incremental top down graph
    8.54x faster than zedux logger only incremental by namespaces graph
    8.93x faster than zedux logger only incremental bottom up graph
    9.01x faster than zedux logger only incremental flat graph
    11.46x faster than zedux logger all graphs
    25.94x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    2.53x faster than zedux logger one lines logs
    2.88x faster than zedux logger grouped logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    3.34x faster than zedux logger no snapshots
    4.01x faster than zedux logger snapshots
```