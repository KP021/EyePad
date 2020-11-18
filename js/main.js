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
                totX += data.x;
                totY += data.y;
                num++;
                if (clock - initClock > 3000) {
                    console.log(totX / num, totY / num);
                    var elem = document.elementFromPoint(totX / num, totY / num)
                    if (elem != null) {
                        elem.click();
                        totX = 0;
                        totY = 0;
                        initClock = clock;
                        num = 0;
                        console.log("Sent click");
                    }

                }

            }
        }).begin();
    webgazer.showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


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