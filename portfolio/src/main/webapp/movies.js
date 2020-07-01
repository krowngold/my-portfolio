{
    function movieGenerator() {
        /*
            Object to construct all the movie reviews I've uploaded with the
            most recent review being at the top of the reviewJSON field.
        */
        this.reviewJSON = JSON.stringify({
            darkFate : {
                title: "Terminator: Dark Fate",
                poster: "../images/terminatordarkfate.jpg",
                info: [
                    "Director: Tim Miller<br>" +
                    "Cast: Linda Hamilton, Mackenzie Davis, Natalia Reyes<br>" +
                    "Runtime: 128 minutes"
                ],
                date: "November 5th, 2019",
                content: [
                    "I'm going to save you some time, this movie straight up " +
                    "sucked. Anytime the film gets pacing and flow correct, you " +
                    "can spot some inconsistency that contradicts something " +
                    "previously set up in canon or is clearly included for action " +
                    "value. Sure, you can see the movie for the action sequences, but " +
                    "even just shutting the brain off and gawking at explosions " +
                    "doesn't work in this instance because of how pointless it is " +
                    "to fight such a powerful terminator. The acting from all parties " +
                    "is dry and the only high points are heavily reliant on quotes from " +
                    "earlier entries in the series. Terminator truly has met a dark fate."
                ],
                score: "Final Score: 3/10"
            },
            joker : {
                title: "Joker",
                poster: "../images/joker.jpeg",
                info: [
                    "Director: Todd Phillips<br>" +
                    "Cast: Joaquin Phoenix, Robert De Niro, Zazie Beetz<br>" +
                    "Runtime: 122 minutes"
                ],
                date: "October, 7th 2019",
                content: [
                    "Joaquin Phoenix gives one of the best performances of the year " +
                    "and manages to personify Joker as well as - if not better than - " +
                    "Heath Ledger. Many of the shots revel in the bleak nature of the " +
                    "film, confining the characters to their own entrapment without " +
                    "any hope of escape through what society views as appropriate means. " +
                    "The script's heavy reliance on motifs of comedy's subjectivity and " +
                    "mental health stigmas breathe so much life into the film except for " +
                    "certain sections where the scene feels as if it'll never wrap up. " +
                    "That being said, if DC wants to be dark and gritty, this is the " +
                    "way to do it."
                ],
                score: "Final Score: 8/10"
            },
            elCamino : {
                title: "El Camino: A Breaking Bad Movie",
                poster: "../images/elcamino.jpg",
                info: [
                    "Director: Vince Gilligan<br>" +
                    "Cast: Aaron Paul, Jesse Plemons, Robert Forster<br>" +
                    "Runtime: 122 minutes"
                ],
                date: "October 8th, 2019",
                content: [
                    "Breaking Bad's cinematography was widely considered as second to none. " +
                    "The same holds true for \"El Camino: A Breaking Bad Movie\", with some " +
                    "excellent shots that will leave you wondering how Vince Gilligan " +
                    "managed to get everything into frame. While the cinematography remains " +
                    "a high point for Gilligan's work, the film drags to numerous moments " +
                    "in the build-up to the next set piece. Breaking Bad fans will " +
                    "find solace in Aaron Paul's acting distinguishing himself from his " +
                    "peers as his raw emotion and debilitation flood the screen. The acting " +
                    "and visuals satisfies the Breaking Bad itch, but the pacing slows the " +
                    "movie down far too often. The decision to make this a two hour film is " +
                    "questionable, but those who survive the drawn out sections will be " +
                    "rewarded. "
                ],
                score: "Final Score: 7/10"
            }
        });
    }

    movieGenerator.prototype.getReviews = function() {
        /*
            Parses JSON from constructed object and converts it to an array
            of elements, where that array is stored in another array to be 
            returned as the result of the function
        */
        let result = [];
        let parsedJSON = JSON.parse(this.reviewJSON);
        for (var review in parsedJSON) {
            let reviewInfo = [];
            let indReview = parsedJSON[review];
            reviewInfo.push(indReview["title"], indReview["poster"], indReview["info"],
                            indReview["date"], indReview["content"], indReview["score"]);
            result.push(reviewInfo);
        }
        return result;
    }

    movieGenerator.prototype.loadHTML = function(reviews) {
        /*
            Convert reviews contained in the array and converts it to HTML format.
        */
        let reviewContainerDiv = document.getElementById("reviewPageContainer");
        for (let i = 0; i < reviews.length; i++) {
            let viewTemplate = [
                '<div class="reviewContainer" id="' + reviews[i][0] + '">' +
                '<div class="movieInfoContainer">' +
                    '<div class="movieTitle">' +
                        '<h2>' + reviews[i][0] + '</h2>' +
                    '</div>' +
                    '<div class="moviePoster">' +
                        '<img src="' + reviews[i][1] + '">' +
                    '</div>' +
                    '<div class="movieInfo">' +
                        '<h4>' + reviews[i][2] + '</h4>' +
                    '</div>' +
                '</div>' +
                '<div class="reviewContentContainer">' +
                    '<div class="reviewDate">' +
                        '<h3>' + reviews[i][3] + '</h3>' +
                    '</div>' +
                    '<div class="reviewContent">' +
                        '<h4>' + reviews[i][4] + '</h4>' +
                        '<h3>' + reviews[i][5] + '</h3>' +
                    '</div>' +
                '</div>' +
            '</div>'
            ].join();
            reviewContainerDiv.innerHTML += viewTemplate;
        }
    }

    window.addEventListener('load', (event) => {
        console.log("CREATING displayReviews");
        let displayReviews = new movieGenerator();
        console.log("CREATING reviews");
        let reviews = displayReviews.getReviews();
        console.log("LOADING HTML");
        displayReviews.loadHTML(reviews);
    }); 
}