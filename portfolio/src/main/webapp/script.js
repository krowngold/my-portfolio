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
        if (document.getElementById('comments') != null) {
            loadComments(1);
        }
    });
}

async function loadComments(maxInput) {
    fetch('/list-comments?max=' + maxInput)
    .then(response => response.json())
    .then((comments) => {
        const commentArea = document.getElementById("comments");
        document.getElementById("max-input").value = '';
        commentArea.innerHTML = "";
        comments.forEach((comment) => {
            commentArea.innerHTML += createCommentElement(comment);
        })
    });
}

function createCommentElement (comment) {
    //create outline for comment template
    let commentTemplate = [
        '<div class="comment">' +
            '<h4 class="commenter">' + comment.name + '</h4>' +
            '<h5 class="commentContent">' + comment.content + '</h5>' +
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
        loadComments(0);
    });
}