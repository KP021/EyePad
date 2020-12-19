//code from @henrikra from https://gist.github.com/caseyjustus/1166258#file-median-js
function median(numbers) {
  const middle = (numbers.length + 1) / 2;
  const sorted = [...numbers].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;
  return isEven ? (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2 : sorted[middle - 1];
}
window.onload = async function() {
    var initClock = 0;
	var currentXVals = []; 
	var currentYVals = []; 
	var medX = 0;
	var medY = 0;
    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data != null && calibStatus == -1) {
                currentXVals.push(data.x);
                currentYVals.push(data.y);
                if (clock - initClock > 2000) {
					medX = median(currentXVals);
					medY = median(currentYVals);
                    console.log(medX, medX);
                    var elem = document.elementFromPoint(medX, medY);
                    if (numpad.contains(elem)) {
						elem.click();
						console.log("Sent click to ", elem.id);
                    }					
					currentXVals = []; 
					currentYVals = []; 
					initClock = clock;
                }

            }
        }).begin();



    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};

// Kalman Filter defaults to on. Can be toggled by user.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart() {
    webgazer.clearData();
}