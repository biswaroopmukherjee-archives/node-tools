# node-tools
Useful stuff for node

## spectra_bin

Usage:
``` javascript
var sb = require("./spectra_bin.js");
var binnedspec = sb.BinSpectra(spectra_x, spectra_y);
```
where `spectra_x` and `spectra_y` are arrays and `binnedspec` is a 2D array. Here, `binnedspec[0]` is the binned x-array and `binnedspec[1]` is the binned y-array.


