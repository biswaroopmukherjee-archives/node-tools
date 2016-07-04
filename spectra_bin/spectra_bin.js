// spectra_bin.js is a module to bin the spectra into finite categories

var exports = module.exports={};

// Start with empty bins
function makeEmpty(xmin,xmax,xspacing) {
	// Find the number of points needed
	var Npoints = Math.round((xmax-xmin)/xspacing);
	// Allocate memory for speed
	var x_array = Array.apply(null, Array(Npoints)).map(Number.prototype.valueOf,0);
	var y_array = Array.apply(null, Array(Npoints)).map(Number.prototype.valueOf,0);
	// Fill out the x-array
	for (i=0; i<=Npoints; i++){
		raw_value = xmin+(i*xspacing);
		x_array[i] = Math.round(raw_value * 100) / 100;
	}
	return [x_array, y_array];
};

// get the mean of an array
function getMean(test_array){
	var total = 0;
	for (var i=0; i<test_array.length; i++){
		total += test_array[i]
	}
	var avg = total/test_array.length
	return avg
}

// Bin the spectra
exports.BinSpectra = function(spectra_x, spectra_y){

	// Set bin parameters
	var xmax = 1020;
	var xmin = 299;
	var xspacing = 0.2;
	// Find the number of points needed
	var Npoints = Math.round((xmax-xmin)/xspacing);

	// Initialize
	var binned_spectrum = makeEmpty(xmin,xmax,xspacing);

	// Find the bins in spectra_x
	for (i=0; i<=Npoints; i++){
		var y_bin = [];
		// Find the y-values in the current bin
		for (j=0; j<spectra_x.length; j++){
			var x_point = spectra_x[j]
			var bin_edges = [binned_spectrum[0][i] - xspacing/2, binned_spectrum[0][i+1] - xspacing/2]
			// Check if the current x_point is in the bin
			if (bin_edges[0] <= x_point && x_point < bin_edges[1]){
				y_bin.push(spectra_y[j])
			}
		}

		// Calculate the average in the bin and set it to the current value in the binned spectrum
		if (y_bin.length==0 && i==0){
			// Set the first one to be zero if the bin is empty
			binned_spectrum[1][i] = 0;
		}
		else if (y_bin.length==0 && i!=0){
			// If the bin is empty, set the value to be the same as the previous
			binned_spectrum[1][i] = binned_spectrum[1][i-1];
		}
		else{
			// Otherwise, take the mean and round to the hundredths
			binned_spectrum[1][i] = Math.round(getMean(y_bin) * 100)/100;
		}
	}

	return binned_spectrum
}