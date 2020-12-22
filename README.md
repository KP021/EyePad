# EyePad
This library aims to use Eye Tracking to input Num keys on a webpage, demonstrating the feasability of eye-controlled web browsing

## Background 
Increasing computer access for people with mobility impairments is an important task in the realm ofaccessible technology. Most of the currently available solutions focus on specific parts of the problemspace, such as Microsoft and Logitech’s assistive devices and game controllers. This results in a lackof holistic solution for users. The current landscape calls for a need for an integrated solution thatworks well across devices and applications. With that goal in mind, we decided to develop EyePad, agaze tracking based Numpad that serves as a proof of concept for further eye-controlled application,assisting users with mobility impairments and improving overall user experience. EyePad works onmost browsers and on any webcam-enabled computer, and could be easily scaled to new web-basedapplications.

## Demo

![Video Demo](https://github.com/KP021/InputGazer/blob/main/images/gif_video_demo.gif)



## Files

To correctly initialize and run the tools, the following files and folders are needed
- keypad.html
- keypad.css
- js folder 

To run the tool, it will be necessary to initialize a local http server

![Console server](https://github.com/KP021/InputGazer/blob/main/images/console.png)

Camera permissions will be needed to ensure tool function.
The user will have to calibrate on the points provided before using the numpad. A calibration of 27-45 clicks, 3-5 per point, is suggested.

# Write-Up

### Problem Statement
With the increased accessibility to Cloud Computing resources and the increased demand for ac-cessibility across platforms and locations, web-based applications have become more prominent,rivaling desktop-only applications in popularity. With an increase in web-based applications,developing and improving tools for web navigation becomes of interest to both help users with motionimpairments and improve the general user experience. Specifically, hands-free web control has thepotential to introduce new functionalities, as well as increase user productivity.

### Current Technology
With the advent of mobile virtual assistants, voice control has become the main tool for hands-free browsing. Commercially available tools, such as voice search, allow for an improved user experience. However, these tools have also attracted increased criticism for the possible mishandling of userdata, as well as provide privacy concerns for the constant use of microphone sensors. Some other drawbacks of voice-controlled browsing include the difficulty of use in noisy environments, privacyconcerns when used in public places, and limited functionalities. Another limitation difficult toovercome with currently available technology is the disproportionate increase in user burden forsimpler tasks, such as scrolling up or down a page or changing browser tabs, when attempted throughvoice control.A possible alternative to voice control is visual control. Visual control utilizing user webcams hasbeen tested for marketing purposes, with the notable example of RealEye.io. Gaze-controlled applications could introduce a potentially large number of functionalities, while improving upon some of the drawbacks of voice-controlled browsing, such as limiting environmental interference intool usage, as well as potentially significantly decrease user burden.

### Hardware

With our goal of building on widely available devices, we chose laptops with an inbuilt webcam or PCs with an external webcam . We chose the larger "real estate" on laptops over mobile devices, as they allow for robust performance on our initial prototype. Additionally, with the acceleration ofremote work because of Covid19, webcams on laptops will become ever more capable.


### Libraries
After having decided on hardware as widely available laptops with a webcam, we decided to choose libraries based on the following evaluation criteria:
- Open-source
- Fast iterations
- Privacy 
- Runs on the client
- Doesn’t require additional hardware
- Easy to integrate with the existing architecture

Before  choosing  Webgazer.JS(an  open-source  web-based  library),  we  also  considered  other alternatives:
- Turkergaze[7]
- Pygaze[2]
- iTracker


## Machine Learning Regression Analysis

### Ridge Regression
Ridge regression is a widely used statistical technique for predictive modelling. The regression algorithm outputs an equation, where features are independent variables, on which a target variable is dependent upon. The following is a generalized version of a output ridge regression equation:

![Equation 1](https://github.com/KP021/InputGazer/blob/main/images/Equation%201.png)

In the generalized regression equation above, Y is the target variable and x’s are the independent variables. Thetas, the coefficient, represent an associated weight of each independent variable. The magnitude of theta is dependent upon the importance of the associated independent feature. In order to develop a regression model, ridge regression minimizes the following objective function:

![Equation 2](https://github.com/KP021/InputGazer/blob/main/images/Equation%202.png)

The objective function consists of two components. The first component is the squared deviation between target and predicted variables. The second component is a penalty function that consists of a  product between a constant penalty coefficient ( lambda) and the square of theta. Higher the magnitude of lambda, lower the outputted values of theta (coefficient).

### Weighted Ridge Regression
Weighted ridge regression is a variant of ridge regression. The only difference between both algorithms is the objective function they are minimizing. The Weighted ridge regression objective function is the following:

![Equation 3](https://github.com/KP021/InputGazer/blob/main/images/Equation%203.png)

The objective function of weighted ridge regression separates the training and predictive data set into two components. The first component only consists of training/predicted data acquired by the user during calibration of the webgazer application. The second component of the training/predicted dataset only consists of data used to pre-train the webgazer application. The squared deviation between predicted and target variable for each component of the data sets has an associative weight (Alpha and Beta). Alpha is always greater than Beta as weighted ridge regression puts greater importance on the dataset component,which was acquired by the user.     

### Threaded Ridge Regression
Threaded ridge regression from a statistical standpoint is exactly the same as Ridge regression. The only difference is that Threaded ridge regression can be run on multiple threads. Therefore threaded ridge regression is a faster implementation of standard ridge regression. The advantage of Threaded ridge regression is that it allows small gaze times (to implement commands) and therefore decreases the strain on the users eye and prolongs the user's ability to utilize the application. However it should be noted that Threaded ridge regression has a pretty high computational overhead.

## Experimental Design

![Numpad](https://github.com/KP021/InputGazer/blob/main/images/numpad.png)

Figure 4

![Calibration](https://github.com/KP021/InputGazer/blob/main/images/calibration.png)

Figure 5


Figure 4 shows the calibration screen. The user video is placed in the bottom left corner so none of the buttons are covered up and to give a visual indication that WebGazer is connected and working (indicated by the green box and face mesh on top of the video). The calibration process was inspiredby a sample WebGazer script on their website that also contained nine dots.  To add a calibration sample to the model, simply click on a button and look at it at the same time.  It is assumed thatone is looking at something when you click on it anyways, so this was the best simple method. The implementation showed here changes the original WebGazer script by moving the calibration points inward and allowing for more than 45 calibration samples (each button had a maximum of 5 clicks inthe original). However, to keep things uniform, all tests performed were done with 5 clicks to each button.Once calibration was complete (done by clicking the ’Stop Calibration’ button), prediction begins.Figure 5 shows the numpad that was created to run predictions on. The predictions were shown in two ways: by turning the predicted button blue and by printing the number to the text box. Turning the button blue was done to give a large and east to interpret indication rather than making the user look at the textbox and focusing to read the number. For the backend, three regression methods were tested for accuracy, as well as three prediction pro-cessing methods. The regression methods were standard ridge regression, weighted ridge regressionand threaded ridge regression. The three prediction processing methods were averaging, averagingwith movement thresholding, and median. For these prediction methods, a set dwell time was usedto gather raw outputs from WebGazer and the operation was performed on them to yield a final button location. Averaging with thresholding aimed to make smaller dwell times possible by stoppingpredictions if a large movement (either x or y) was detected.If the raw outputs settled in a smallradius for that dwell time, a final prediction could be made at the average of those recorded values.For our baseline, standard ridge regression and standard averaging were used for the regression andprediction processing modes respectively.The performance metric was character accuracy for a 10 digit code. This length was chosen to mimicthe format of a phone number. 4-5 trials were attempted each method and repeated numbers were removed from the predictions. To calculate accuracy, the total number of matched characters acrossall trials was divided by total number of characters tested (40 if 4 trials or 50 if 5 trials)

## Future Work
We want to expand the number of web based applications we offer. Some of these applications include a calculator, keyboard and video player. For the development of more advanced applications, we would need to introduce commands (decreasing volume, fast forwarding a video) that can be achieved without clicking a button. The most apt way to introduce these commands is to develop a network that associates specific eye movements (ex. moving left to right) to a specific command. We theorize that the said networks architecture would look something like the following:

![Network Architecture](https://github.com/KP021/InputGazer/blob/main/images/Future%20Work-%20ML%20Sensing.png)

The above picture shows a composite network architecture. This deep learning network consists of convolutional layers (CNN) and LSTM layers. The CNN layers identify the position of the eye pupil in reference to a predefined grid map from a live video stream originating from a computer’s web camera. The CNN layer passes the position of the eye pupil to an LSTM layer at every time period. The LSTM layer stores the position of previous and current eye positions. After a set time period, the LSTM layer collates all the positions of the pupil and interprets the aggregate eye motion. This aggregate eye motion represents a specific computer command. 

Furthermore we identified that the accuracy of the webgazer application is very susceptible to light conditions and the quality of the video stream. Therefore we strive to further investigate how best to optimize the current webgazer network for environmental conditions which are more realistic.         


## Conclusion
Based on our experiments we found out that the combination of Tensorflow Facemesh for gaze detection, Threaded Ridge Regression for gaze prediction, and Average of predicted points over input selection time to provide the best performance. We also noted that calibration of gaze points with cursor improved the performance of our system considerably and sharing calibration data across sessions and users could improve the performance further. 
In our observations, we also encountered a few limitations of our system that are consistent with the ones mentioned for Webgazer in theory:
- Works better for X co-ordinate than Y
- Constrained by low lighting, variation in head pose, and facial-worn objects such as glasses or masks

However, the current limitations of our PC based solution won't impede a Virtual Reality based solution. We urge the VR community to come together and develop a computing paradigm that includes the people with mobility impairment from the get go..
