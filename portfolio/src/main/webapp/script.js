// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

{

    function imageCache() {
        /*
            Create an object that stores the location of all images I want to use
        */
        this.cache = [
            "../images/noah.png",
            "../images/canada.jpg",
            "../images/coulon.jpg",
            "../images/denver.jpg",
            "../images/lion.jpg",
            "../images/seattle.jpg",
            "../images/uwfriends.jpg"
        ];
        this.index = 0;
        this.img = this.cache[this.index];
    };

    imageCache.prototype.decreasePicture = function(id) {
        /*
            Move to the previous image in the cache
        */
        let element = document.getElementById(id);
        this.index--;
        if (this.index < 0) {
            this.index = this.cache.length - 1;
        }
        this.img = this.cache[this.index];
        element.src = this.img;
    };

    imageCache.prototype.increasePicture = function(id) {
        /*
            Move to the next image in the cache
        */
        let element = document.getElementById(id);
        this.index++;
        if (this.index >= this.cache.length) {
            this.index = 0;
        }
        this.img = this.cache[this.index];
        element.src = this.img;
    };

    imageCache.prototype.getImage = function(id) {
        /*
            Get the image the cache currently points to
        */
        let element = document.getElementById(id);
        let imgCache = new imageCache();
        element.src = imgCache.cache[imgCache.index];
        return imgCache.cache[imgCache.index];
    }

    window.addEventListener('load', (event) => {
        let el = document.getElementById("photoViewArea");
        if (el != null) {
            el.src = "../images/noah.png";
        }
        if (document.getElementById('comments') != null && 
            document.getElementById('max-input').value == "") {
            loadComments(0);
        }
        if (document.getElementById('map') != null) {
            createMapScript();
        }
    });
}

async function loadComments(maxInput) {
    if (document.getElementById("max-input").value == "") {
        maxInput = "0"; //default value to signal no query needed
    }
    fetch('/list-comments?max=' + maxInput)
    .then(response => response.json())
    .then((comments) => {
        const commentArea = document.getElementById("comments");
        document.getElementById("max-input").value = '';
        commentArea.innerHTML = "<h3>Comments</h3>";
        comments.forEach((comment) => {
            commentArea.innerHTML += createCommentElement(comment);
        })
    });
}

function createCommentElement (comment) {
    //create outline for comment template
    let commentTemplate = [
        '<div class="comment">' +
            '<h5 class="commenter">' + comment.name + '</h5>' +
            '<h4 class="commentContent">' + comment.content + '</h4>' +
        '</div>'
    ];
    return commentTemplate;
}

function deleteAllComments() {
    fetch("/delete-data", {
        method: 'POST'
    })
    .then(response => response.json())
    .then((deletion) => {
        console.log("deleted comments");
        loadComments(0);
    });
}

function createMapScript() {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + config.mapsKey +
                 '&callback=initMap';
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function() {
        // JS API is loaded and available
        var styledMapType = new google.maps.StyledMapType(
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#523735"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#93817c"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                    {
                        "color": "#a5b076"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#447530"
                    }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#f8c967"
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#e98d58"
                    }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#db8555"
                    }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#806b63"
                    }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#92998d"
                    }
                    ]
                }
            ],
            {name: 'Styled Map'}
        );
        fetch("/marker-data").then(response => response.json()).then((mapMarkers) => {
            const map = new google.maps.Map(
            document.getElementById('map'),
            {
                center: {lat: 47.454364, lng: -122.167713},
                zoom: 10,
                draggable: true,
                rotateControl: false,
                streetViewControl: false,
                streetViewControlOptions: false,
                mapTypeControlOptions: {
                    mapTypeIds: ['styled_map']
                }
            }
            );
            // addMarkers(map);
            mapMarkers.forEach((mapMarker) => {
                console.log(mapMarker);
                var marker;
                if (mapMarker.imgLink !== " ") {
                    var logo = {
                        url: mapMarker.imgLink,
                        scaledSize: new google.maps.Size(50,50),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 0)
                    }
                    marker = new google.maps.Marker(
                        {
                            position: {lat: mapMarker.lat, lng: mapMarker.lng},
                            map: map,
                            icon: logo
                        }
                    )
                }
                else {
                    marker = new google.maps.Marker(
                        {
                            position: {lat: mapMarker.lat, lng: mapMarker.lng},
                            map: map,
                        }
                    )
                }
                var infoWindow = new google.maps.InfoWindow({
                    content: mapMarker.content
                });
                marker.addListener("click", function() {
                    infoWindow.open(map, marker);
                });
            });

            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
        })

    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
}