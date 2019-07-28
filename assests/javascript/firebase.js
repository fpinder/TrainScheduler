// Document Ready Function
$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCaVbmmLrPAZOUfgoilSGZx7B1zVTxjjS0",
        authDomain: "fir-train-b2224.firebaseapp.com",
        databaseURL: "https://fir-train-b2224.firebaseio.com",
        projectId: "fir-train-b2224",
        storageBucket: "",
        messagingSenderId: "824574635354",
        appId: "1:824574635354:web:d9e08574899bfa77"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var trainName = " My Train";

    // Capture Button Click
    $("#add-train").on("click", function (event) {

        // Don't refresh the page!
        event.preventDefault();

        trainName = $("#tName").val().trim();

        database.ref().set({
            train: trainName
        });

        // Firebase watcher + initial loader HINT: .on("value")
        database.ref().on("value", function (snapshot) {

            // Log everything that's coming out of snapshot
            console.log(snapshot.val());
            console.log(snapshot.val().name);
            // console.log(snapshot.val().email);
            // console.log(snapshot.val().age);
            // console.log(snapshot.val().comment);

            // Change the HTML to reflect
            $("#tName").text(snapshot.val().name);
            // $("#email-display").text(snapshot.val().email);
            // $("#age-display").text(snapshot.val().age);
            // $("#comment-display").text(snapshot.val().comment);

            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    });


});