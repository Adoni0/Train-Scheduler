// Your web app's Firebase configuration   
    var firebaseConfig = {
        apiKey: "AIzaSyD9XVmdKAk7JtmD3P3AszdHtk78oe6azu0",
        authDomain: "train-scheduler-790da.firebaseapp.com",
        databaseURL: "https://train-scheduler-790da.firebaseio.com",
        projectId: "train-scheduler-790da",
        storageBucket: "train-scheduler-790da.appspot.com",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      var db = firebase.database();

      $('#submit').on('click', function(e){
          event.preventDefault();

          var trainName = $('#train-name').val().trim();
          var destination = $('#destination').val().trim();
          var trainTime = $('#train-time').val().trim();
          var frequency = parseInt($('#frequency').val().trim());
        console.log(trainName, destination, trainTime, frequency);
          db.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
          });


          $('#train-name').val('');
          $('#destination').val('');
          $('#train-time').val('');
          $('#frequency').val('');

        //   var tableBody = $('#table-body');
        //   tableBody.innerHtml += '<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + trainName + '</td><td>' + frequency + '</td></tr>';
      });


db.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var trainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;

    var timeArray = trainTime.split(':');
    var time = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var max = moment.max(moment(), time);
    var minutesAway;
    var nextArrival;

    if(time === max){
        nextArrival = time.format('hh:mm A');
        minutesAway = time.diff(moment(), 'minutes');
    } else{
        var difference = moment().diff(time, 'minutes');
        var remainder = difference%frequency;
        minutesAway = frequency - remainder;
        nextArrival = moment().add(minutesAway, 'm').format('hh:mm A');
    }
    console.log(minutesAway, nextArrival);
    $('#table-body').prepend(snapshot.val().trainName);
    $('#table-body').prepend(snapshot.val().destination);
    $('#table-body').prepend(snapshot.val().trainTime);
    $('#table-body').prepend(snapshot.val().frequency);

   
}); //add id to table items so that html table can be updated
//better option might be to prepend inputs by selecting input id's and adding most recent input to top of table

