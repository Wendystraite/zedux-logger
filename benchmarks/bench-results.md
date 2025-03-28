# Benchmarks results

```
 ✓ benchmarks/graph.bench.ts > graph 28835ms
     name                                                    hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger                                  450.40   1.3173  21.5501   2.2202   2.1222   7.6069   9.4445  21.5501   ±4.32%      901   fastest
   · zedux logger no graph                              57.3887  11.7903  41.2667  17.4250  18.6577  30.7971  41.2667  41.2667   ±4.00%      115
   · zedux logger all graphs                            21.6276  34.3137   125.89  46.2372  45.8919   125.89   125.89   125.89  ±11.89%       44
   · zedux logger all incremental graphs                14.1021  57.3174  91.2965  70.9113  74.8302  91.2965  91.2965  91.2965   ±4.58%       29   slowest
   · zedux logger only flat graph                       23.1978  34.7049  68.3435  43.1075  45.5078  68.3435  68.3435  68.3435   ±3.70%       47
   · zedux logger only incremental flat graph           14.2674  57.3803  81.0348  70.0900  74.4435  81.0348  81.0348  81.0348   ±3.42%       29
   · zedux logger only top down graph                   22.0336  35.6948  54.3080  45.3852  48.7997  54.3080  54.3080  54.3080   ±3.07%       45
   · zedux logger only incremental top down graph       14.5205  60.6734  82.7951  68.8680  71.3967  82.7951  82.7951  82.7951   ±2.85%       30
   · zedux logger only bottom up graph                  22.2038  34.5146  91.4452  45.0374  46.5562  91.4452  91.4452  91.4452   ±5.96%       45
   · zedux logger only incremental bottom up graph      14.4786  63.4237  82.2972  69.0676  70.9248  82.2972  82.2972  82.2972   ±2.26%       29
   · zedux logger only by namespaces graph              20.9574  36.0802  60.4954  47.7158  52.0187  60.4954  60.4954  60.4954   ±3.36%       43
   · zedux logger only incremental by namespaces graph  14.2310  61.1546  84.6853  70.2689  73.9687  84.6853  84.6853  84.6853   ±3.35%       29

 ✓ benchmarks/deobfuscate.bench.ts > deobfuscate 6859ms
     name                              hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger            440.39   1.2949  21.4115   2.2707   2.1360   8.3905   9.5220  21.4115   ±4.65%      881   fastest
   · zedux logger no deobfuscate  38.6900  21.8969  39.4981  25.8465  27.3936  39.4981  39.4981  39.4981   ±2.56%       78
   · zedux logger deobfuscate     18.3314  33.8107   141.09  54.5512  56.3808   141.09   141.09   141.09  ±12.87%       37   slowest

 ✓ benchmarks/oneLineLogs.bench.ts > one line logs 6774ms
     name                              hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger            564.97   0.9778   9.1675   1.7700   1.7729   5.9704   6.4042   8.2429  ±3.52%     1130   fastest
   · zedux logger grouped logs    30.4934  24.5066  42.6245  32.7940  36.6241  42.6245  42.6245  42.6245  ±3.74%       61
   · zedux logger one lines logs  25.0490  24.3103   115.27  39.9218  41.4287   115.27   115.27   115.27  ±9.69%       51   slowest

 ✓ benchmarks/snapshots.bench.ts > snapshots 6850ms
     name                            hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger          453.12   1.2891  15.7079   2.2069   2.0707   7.6584  12.1352  15.7079   ±4.29%      907   fastest
   · zedux logger no snapshots  26.7872  30.2289  56.6008  37.3312  39.0922  56.6008  56.6008  56.6008   ±3.52%       54
   · zedux logger snapshots     22.9792  32.6743   121.59  43.5177  44.1912   121.59   121.59   121.59  ±10.80%       47   slowest

 ✓ benchmarks/addZeduxLogger.bench.ts > addZeduxLogger 7147ms
     name                                                     hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                                   556.48   0.9694  10.3258   1.7970   1.7328   6.2570   8.1673   9.9244  ±3.81%     1113   fastest
   · zedux logger all enabled with incremental graph     15.6052  50.7309  88.7262  64.0811  69.1188  88.7262  88.7262  88.7262  ±5.54%       32   slowest
   · zedux logger all enabled without incremental graph  17.9793  40.4227   124.38  55.6196  56.7588   124.38   124.38   124.38  ±8.66%       36

 BENCH  Summary

  basic zedux logger - benchmarks/addZeduxLogger.bench.ts > addZeduxLogger
    30.95x faster than zedux logger all enabled without incremental graph
    35.66x faster than zedux logger all enabled with incremental graph

  basic zedux logger - benchmarks/deobfuscate.bench.ts > deobfuscate
    11.38x faster than zedux logger no deobfuscate
    24.02x faster than zedux logger deobfuscate

  basic zedux logger - benchmarks/graph.bench.ts > graph
    7.85x faster than zedux logger no graph
    19.42x faster than zedux logger only flat graph
    20.28x faster than zedux logger only bottom up graph
    20.44x faster than zedux logger only top down graph
    20.83x faster than zedux logger all graphs
    21.49x faster than zedux logger only by namespaces graph
    31.02x faster than zedux logger only incremental top down graph
    31.11x faster than zedux logger only incremental bottom up graph
    31.57x faster than zedux logger only incremental flat graph
    31.65x faster than zedux logger only incremental by namespaces graph
    31.94x faster than zedux logger all incremental graphs

  basic zedux logger - benchmarks/oneLineLogs.bench.ts > one line logs
    18.53x faster than zedux logger grouped logs
    22.55x faster than zedux logger one lines logs

  basic zedux logger - benchmarks/snapshots.bench.ts > snapshots
    16.92x faster than zedux logger no snapshots
    19.72x faster than zedux logger snapshots
```