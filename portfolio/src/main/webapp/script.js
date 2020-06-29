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

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['I earned my Eagle Scout rank at 14 years old!', 
      'In the fourth grade I won 4th place in a local chess tournament', 
      "I played varsity tennis in high school", 
      'I have been to 11 states!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
};

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
        if (document.getElementById('comments') != null) {
            loadComments();
        }
    });
}

async function getHelloWorld() {
    console.log("Getting Hello World!");
    const message = await fetch('/data?max=3');
    const promise = await message.text();
    document.getElementById('hello_world_button').innerHTML = promise;
}

// async function loadComments() {
//     console.log("Getting comments");

//     //gather data for each element to be created
//     let commentPlacementArea = document.getElementById('comments');
//     let el = document.getElementById('max-input');
//     // let maxInput = el.value;
//     const fetchedComments = await fetch('/data');
//     const commentsText = await fetchedComments.text();
//     console.log(commentsText);
//     console.log("fetching messages");

//     for (let comment in commentsText) {
//         commentPlacementArea.appendChild(createComment(comment));
//     }
// }

// function createComment(comment) {
    // //create outline for comment template
    // const commentContainer = document.createElement('div');
    // const commentName = document.createElement('h4');
    // const commentContent = document.createElement('h6');
    // console.log(comment);
    // commentName.innerText = comment.name;
    // commentContent.innerText = comment.comment;

    // commentContainer.appendChild(commentName);
    // commentContainer.appendChild(commentContent);
    // return commentContainer;
// }

function loadComments(maxInput) {
    fetch('/list-comments?max=' + maxInput)
    .then(response => response.json())
    .then((comments) => {
        const commentArea = document.getElementById("comments");
        document.getElementById("max-input").value = '';
        commentArea.innerHTML = "";
        comments.forEach((comment) => {
            commentArea.appendChild(createCommentElement(comment));
        })
    });
}

function createCommentElement (comment) {
    //create outline for comment template
    const commentContainer = document.createElement('div');
    const commentName = document.createElement('h4');
    const commentContent = document.createElement('h5');
    console.log(comment);
    
    commentName.innerText = comment.name;
    commentContent.innerText = comment.content;

    commentContainer.appendChild(commentName);
    commentContainer.appendChild(commentContent);
    return commentContainer;
}

function deleteAllComments() {
    fetch("/delete-data", {
        method: 'POST'
    })
    .then(response => response.json())
    .then((deletion) => {
        loadComments(0);
    });
}