var sb = require("./spectra_bin.js");

var sample_data = require("./sample_data.json");

var spectra_x = sample_data.spectra_x;
var spectra_y = sample_data.raw_spectra_y;

var binnedspec = sb.BinSpectra(spectra_x, spectra_y);



// console.log('Test spectrum'+binnedspec)



var plotly = require('plotly')('BiswaroopMukherjee91','khjvrn5zi4');





// Plotly stuff

var trace1 = {
	x: spectra_x,
	y: spectra_y,
	mode: 'lines'
};

var trace2 = {
	x: binnedspec[0],
	y: binnedspec[1],
	mode: 'lines'
};

var data = [trace1, trace2];

var layout = {fileopt : "overwrite", filename : "gemasign test"};


plotly.plot(data, layout, function (err, msg) {
	if (err) return console.log(err);
	console.log(msg);
});