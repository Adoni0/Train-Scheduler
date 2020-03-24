// Your web app's Firebase configuration
$(document).ready(function(){
   
    var firebaseConfig = {
        apiKey: "AIzaSyD9XVmdKAk7JtmD3P3AszdHtk78oe6azu0",
        authDomain: "train-scheduler-790da.firebaseapp.com",
        databaseURL: "https://train-scheduler-790da.firebaseio.com",
        projectId: "train-scheduler-790da",
        storageBucket: "train-scheduler-790da.appspot.com",
        messagingSenderId: "429237750413",
        appId: "1:429237750413:web:39cb88436eec9fb7a930c4",
        measurementId: "G-1ESE7KZGGE"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      var db = firebase.database();

      $('#submit').on('click', function(){
          var trainName = $('#train-name').val().trim();
          var destination = $('#destination').val().trim();
          var trainTime = $('#train-time').val().trim();
          var frequency = $('#frequency').val().trim();

          db.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
          });
      });

});


