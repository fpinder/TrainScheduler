// Your web app's Firebase configuration
$(document).ready(function () {
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
    var TrainDestination = "";
    var FirstTrain = "";
    var TrainFrequency = "";

    //capture buton click 
    $("#add-train").on("click", function () {

        // Don't refresh the page!
        event.preventDefault();

        var trainName = $("#tName").val().trim();
        var TrainDestination = $("#destination").val().trim();
        var FirstTrain = $("#fTrain").val().trim();
        var TrainFrequency = $("#frequency").val().trim();



        // console.log("This is the Tarin name " + trainName)
        // console.log("This is the TrainDestination " + TrainDestination)
        //  console.log("This is the FirstTrain " + FirstTrain);
        // console.log("This is the Train Frequency " + TrainFrequency)

        database.ref().push({
            name: trainName,
            Destination: TrainDestination,
            FirstTrain: FirstTrain,
            Frequency: TrainFrequency,
        });

    });
    database.ref().on("child_added", function (snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        // console.log(snapshot.val().name);
        // console.log(snapshot.val().Destination);
        // console.log(snapshot.val().FirstTrain);
        // console.log(snapshot.val().Frequency);

        var trainName = snapshot.val().name;
        var TrainDestination = snapshot.val().Destination;
        var FirstTrain = snapshot.val().FirstTrain;
        var TrainFrequency = snapshot.val().Frequency;


        console.log("This is the FirstTrain " + FirstTrain);
        var firstTrainMoment = moment(FirstTrain, 'HH:mm');
        var nowMoment = moment(); //current date and time

        console.log("firstTrainConverted " + firstTrainMoment)
        console.log("current date and time " + nowMoment)

        var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');

        console.log("minutes Since FirstArrival " + minutesSinceFirstArrival)

        // Change the HTML to reflect the data 
        var tr = ("<tr>");
        var tn = ("<td>");
        var td = ("<td>");


        // tn.append(snapshot.val().name);


        // tr.append(tn);

        // $('#newTrains').append(tr);

        // $("#name-display").text(snapshot.val().name);
        // $("#email-display").text(snapshot.val().email);
        // $("#age-display").text(snapshot.val().age);
        // $("#comment-display").text(snapshot.val().comment);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});