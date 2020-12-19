window.onload = async function() {
    var totX = 0;
    var totY = 0;
    var initClock = 0;
    var num = 0;
    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data != null && calibStatus == -1) {
				webgazer.util.bound(data);
				if ((data.x - totX/num) < 200 && (data.y - totY/num) < 200){
					totX += data.x;
					totY += data.y;
					num++;
				}
				else{
					totX = data.x;
					totY = data.y;
					num = 1;
				}
                if (num > 10) {
                    console.log(totX/num,totY/num);
                    var elem = document.elementFromPoint(totX/num,totY/num);
                    if (numpad.contains(elem)) {
						elem.click();
						console.log("Sent click to ", elem.id);
                    }
					totX = 0;
					totY = 0;
					initClock = clock;
					num = 0;
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