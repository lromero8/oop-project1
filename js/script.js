        
        // Global variables
        var jsonObject = "";
        var game = 0;
        var length = 0;

        var year = "";
        var month = "";
        var day = "";

        
        // ---------------- Materialize code--------------------------
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, {});
        });
        // ---------------- Materialize code--------------------------






        // Ajax synchronus xmlHTTPRequest to get JSON
        function getJSONSync(url) {
            var resp;
            var xmlHttp;
            resp = "";
            xmlHttp = new XMLHttpRequest();
            
            // check to see browser supports this feature
            if (xmlHttp != null) {
                // open a connection for a "GET" request
                xmlHttp.open("GET", url, false);
                // send the "GET" request...
                xmlHttp.send(null);
                // ...wait for the response
                resp = xmlHttp.responseText;
            }
            
            return resp; // return the JSON
        }
        
        // http://gd2.mlb.com/components/game/mlb/year_2015/month_07/day_12
        
        function getDataSynch() {
            // console.log("year " + year);
            // console.log("month " + month);
            // console.log("day " + day);

            var tempUrl = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
            // get json data from url
            var baseballJSON = getJSONSync(tempUrl);
            // parse data into object
            jsonObject = JSON.parse(baseballJSON)


            console.log(jsonObject);

            if (jsonObject.data.games.game) {
                length = jsonObject.data.games.game.length;
                console.log("array length " + length);
                fillingTextboxesUp(jsonObject);
            } else{
                M.toast({html: 'No data for that date', classes: 'grey rounded'});
                document.getElementById("previous").disabled = true;
                document.getElementById("next").disabled = true;
            }
            
        }

        // Function that displays the data in the textboxes
        function fillingTextboxesUp(jsonObject) {
            document.getElementById("homeTeam").value = jsonObject.data.games.game[game].home_team_name;
            document.getElementById("awayTeam").value = jsonObject.data.games.game[game].away_team_name;
            document.getElementById("winningPitcher").value = jsonObject.data.games.game[game].winning_pitcher.first + " " + jsonObject.data.games.game[game].winning_pitcher.last;
            document.getElementById("losingPitcher").value = jsonObject.data.games.game[game].losing_pitcher.first + " " + jsonObject.data.games.game[game].losing_pitcher.last;
            document.getElementById("venue").value = jsonObject.data.games.game[game].venue;

            document.getElementById("previous").disabled = true;

        }

        // Function that disables previous button if the index is at 0
        function disablePrevious(){

            if (game == 0) {
                document.getElementById("previous").disabled = true;                
            } else {
                document.getElementById("previous").disabled = false;
            }

        }

        // Function that disables next button if the index is at length - 1
        function disableNext(){

            if (game == (length) - 1) {
                document.getElementById("next").disabled = true;                
            } else {
                document.getElementById("next").disabled = false;
            }

        }

        // Function that moves the array forward
        function next() {

            game++;
            document.getElementById("homeTeam").value = jsonObject.data.games.game[game].home_team_name;
            document.getElementById("awayTeam").value = jsonObject.data.games.game[game].away_team_name;
            document.getElementById("winningPitcher").value = jsonObject.data.games.game[game].winning_pitcher.first + " " + jsonObject.data.games.game[game].winning_pitcher.last;
            document.getElementById("losingPitcher").value = jsonObject.data.games.game[game].losing_pitcher.first + " " + jsonObject.data.games.game[game].losing_pitcher.last;
            document.getElementById("venue").value = jsonObject.data.games.game[game].venue;       
            console.log(game);
        }

        // Function that moves the array backward
        function previous() {
            game--;
            document.getElementById("homeTeam").value = jsonObject.data.games.game[game].home_team_name;
            document.getElementById("awayTeam").value = jsonObject.data.games.game[game].away_team_name;
            document.getElementById("winningPitcher").value = jsonObject.data.games.game[game].winning_pitcher.first + " " + jsonObject.data.games.game[game].winning_pitcher.last;
            document.getElementById("losingPitcher").value = jsonObject.data.games.game[game].losing_pitcher.first + " " + jsonObject.data.games.game[game].losing_pitcher.last;
            document.getElementById("venue").value = jsonObject.data.games.game[game].venue;
            console.log(game);
        }

        // Function that validates if the user has selected an option
        function validateRetrieve() {
            year = document.getElementById("year_select").value;
            month = document.getElementById("month_select").value;
            day = document.getElementById("day_select").value;
            

            if (year == "Choose your option" || month == "Choose your option" || day == "Choose your option") {
                document.getElementById("retrieve").disabled = true;
                document.getElementById("previous").disabled = true;
                document.getElementById("next").disabled = true;
            } else {
                document.getElementById("retrieve").disabled = false;
                document.getElementById("previous").disabled = false;
                document.getElementById("next").disabled = false;             
            }            
        }