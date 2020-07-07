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
        addMarkers(map);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
}

function addMarkers(map) {
    var lindbergh = {lat: 47.454364, lng: -122.167713};
    var landing = {lat: 47.498154, lng: -122.202927};
    var cse2 = {lat: 47.653063, lng: -122.305106};

    var lhsImage = {
        url: 'https://www.wpastatic.com/lib/ePoster/schools/155/school_logo_08272019220901.png',
        scaledSize: new google.maps.Size(50,50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var washingtonLogo = {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/University_of_Washington_Block_W_logo_RGB_brand_colors.SVG',
        scaledSize: new google.maps.Size(50,50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var lindberghMarker = new google.maps.Marker(
        {
            position: lindbergh, 
            map: map,
            icon: lhsImage
    });

    var landingMarker = new google.maps.Marker(
        {
            position: landing, 
            map: map
    });

    var cse2Marker = new google.maps.Marker(
        {
            position: cse2, 
            map: map,
            icon: washingtonLogo
    });

    var lindberghContent = '<h1>Lindbergh High School</h1><br>' +
        '<p>Lindbergh High School is a (senior) high school located in the ' +
        'southeastern section of Renton, Washington, a suburb of Seattle, in ' +
        'the Renton School District. It is named after Charles A. Lindbergh, ' +
        'the famous aviator who was first to fly solo across the Atlantic in ' +
        '1927. The school was founded in 1972. Freshmen, sophomores and ' +
        'juniors attended the first year, making the class of 1974 the first ' +
        'to graduate. Lindbergh\'s school motto is ad astra, which is Latin ' +
        'for "to the stars". The crest features the Spirit of St. Louis (the ' +
        'plane that Charles Lindbergh flew), and the school\'s motto flanked ' +
        'by stars with the dates 1927 and 1972, respectively.</p>';
    
    var landingContent = '<h1>The Landing</h1><br>' +
        '<p>Renton\'s main outdoor mall, halfway between the Highlands and ' +
        'Downtown. In addition to being within walking distance of Coulon ' +
        'Beach Park, there are lots of great shops and restaurants, and ' +
        'it\'s generally considered to be a great place to hang out.</p>';

    var cse2Content = '<h1>The Bill and Melinda Gates Center</h1><br>' +
        '<p>The Bill & Melinda Gates Center for Computer Science & ' +
        'Engineering (Gates Center) contains classroom, office, and ' +
        'collaborative spaces, expanded research labs, a 250-seat ' +
        'auditorium, and a flexible event space. The facility enabled the ' +
        'Paul G. Allen School of Computer Science & Engineering to double ' +
        'its annual degree production. Adjacent to the existing Paul G. ' +
        'Allen Center for Computer Science & Engineering (Allen Center), ' +
        'the two buildings provide an integrated education and research ' +
        'experience for the Allen School. The Gates Center includes a ' +
        'sophisticated maker space, an undergraduate commons that will ' +
        'serve as a “home away from home” for students enrolled in the ' +
        'major, a wet lab for leading-edge research in molecular ' +
        'information systems, a 3,000 square foot robotics lab, workrooms ' +
        'for the interdisciplinary computer animation capstone, and ' +
        'interview rooms where industry representatives can meet with ' +
        'students.</p>';

    var lindberghIW = new google.maps.InfoWindow({
        content: lindberghContent
    });

    var landingIW = new google.maps.InfoWindow({
        content: landingContent
    });

    var cse2IW = new google.maps.InfoWindow({
        content: cse2Content
    })

    lindberghMarker.addListener('click', function() {
        lindberghIW.open(map, lindberghMarker);
    });
    landingMarker.addListener('click', function() {
        landingIW.open(map, landingMarker);
    });
    cse2Marker.addListener('click', function() {
        cse2IW.open(map, cse2Marker);
    })
}