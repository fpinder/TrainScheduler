// My web app's Firebase configuration
$(document).ready(function () {

    // Initial Values
    var trainName = "";
    var trianDestination = "";
    var firstTrain = "";
    var trainFrequency = 0;

    var firebaseConfig = {
        apiKey: "AIzaSyAdQCxhJwuFPuzMZuCcAdDi9otNySpvLe8",
        authDomain: "train-schedule-e3b61.firebaseapp.com",
        databaseURL: "https://train-schedule-e3b61.firebaseio.com",
        projectId: "train-schedule-e3b61",
        storageBucket: "",
        messagingSenderId: "298874427254",
        appId: "1:298874427254:web:e188016361944e58"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var trianDestination = "";
    var firstTrain = "";
    var trainFrequency = 0;

    // form validation for Time using jQuery Mask plugin
    var firstTrain = $("#fTrain").mask("00:00");
    var trainFrequency = $("#frequency").mask("00");

    //capture buton click 
    $("#add-train").on("click", function () {

        // Don't refresh the page!
        event.preventDefault();

        var trainName = $("#tName").val().trim();
        var trianDestination = $("#destination").val().trim();
        var firstTrain = $("#fTrain").val().trim();
        var trainFrequency = $("#frequency").val().trim();

        // form validation - if empty - alert
        if (trainName.length === 0 || trianDestination.length === 0 || firstTrain.length === 0 || trainFrequency.length === 0) {
            alert("Please Fill All Required Fields");
        } else {



            // Moment Time Conversion
            var fistTrainConvertion = moment(firstTrain, "HH:mm").subtract(1, "years");
            // console.log("Fist Train Convertion " + fistTrainConvertion);

            // compute the difference in time from 'now' and the first train
            var trainDiff = moment().diff(moment(fistTrainConvertion), "minutes");
            // console.log("difference in time from 'now' and the first train " + trainDiff);
            // console.log("Frequency " + trainFrequency);

            // get the remainder of time by the frequency & time difference
            var trainTimeRemainder = trainDiff % trainFrequency;
            // console.log("Train Time Remainder " + trainTimeRemainder);

            //subtract the remainder from the frequency to get the minutes till trian arrival ("Minutes Away in table")
            var minutesTillArrival = trainFrequency - trainTimeRemainder;
            // console.log("Minutes Till Arrival " + minutesTillArrival);

            // Add minutesTillArrival to find next train & convert to standard time format
            var nextTrainArrival = moment().add(minutesTillArrival, "minutes");
            // console.log("Next Train Arrival " + nextTrainArrival);

            //Arrival time ("Next Arival in table")
            var arrivalTime = moment(nextTrainArrival).format("hh:mm A");
            // console.log("Arrival Time " + arrivalTime);

            database.ref().push({
                name: trainName,
                Destination: trianDestination,
                FirstTrain: firstTrain,
                Frequency: trainFrequency,
                date_added: firebase.database.ServerValue.TIMESTAMP

                //Clear Train entry Values
            });

            $("#tName").val('');
            $("#destination").val('');
            $("#fTrain").val('')
            $("#frequency").val('');
        }
    });

    database.ref().on("child_added", function (snapshot) {

        firstTrain = snapshot.val().FirstTrain;
        trainFrequency = snapshot.val().Frequency;

        console.log(snapshot.val());

        console.log("First train value " + firstTrain)
        // console.log("current time " + moment().format('LLLL'));

        // Moment Time Conversion
        var fistTrainConvertion = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log("Fist Train Convertion " + fistTrainConvertion);

        // compute the difference in time from 'now' and the first train
        var trainDiff = moment().diff(moment(fistTrainConvertion), "minutes");
        console.log("difference in time from 'now' and the first train " + trainDiff);
        console.log("Frequency " + trainFrequency);

        // get the remainder of time by the frequency & time difference
        var trainTimeRemainder = trainDiff % trainFrequency;
        console.log("Train Time Remainder " + trainTimeRemainder);

        //subtract the remainder from the frequency to get the minutes till trian arrival ("Minutes Away in table")
        var minutesTillArrival = trainFrequency - trainTimeRemainder;
        console.log("Minutes Till Arrival " + minutesTillArrival);

        // Add minutesTillArrival to find next train & convert to standard time format
        var nextTrainArrival = moment().add(minutesTillArrival, "minutes");
        console.log("Next Train Arrival " + nextTrainArrival);

        //Arrival time ("Next Arival in table")
        var arrivalTime = moment(nextTrainArrival).format("hh:mm A");
        console.log("Arrival Time " + arrivalTime);



        $("#newTrains").append(
            "<tr><td>" + snapshot.val().name + "</td>" +
            "<td>" + snapshot.val().Destination + "</td>" +
            "<td class='tableData'>" + snapshot.val().Frequency + "</td>" +
            "<td>" + arrivalTime + "</td>" +
            "<td class='tableData'>" + minutesTillArrival + "</td>" +

            "</tr>"
        );
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});