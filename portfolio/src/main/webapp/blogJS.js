{

    function blogSetup() {
        /*
            Contains all the necessary information about a blog post, with
            the most recent post being the at the top of the variable.
        */
        this.blogJSON = JSON.stringify({
            blog1 : {
                "title" : "Thoughts On Filming Dialogue",
                "date" : "June 23rd, 2020",
                "content" : [
                    "Today's films have a tendency to overcut their movies. What do "+
                    "I mean by this? Well, say you have a scene where two characters "+
                    "are talking to each other in a fairly timid location, like a "+
                    "diner or on the couch. Now, if you were watching these characters "+
                    "speak to each other as a bystander, which the audience inherently "+
                    "is, cutting between views of characters would quickly become "+
                    "repetitive as your neck reenacts a tennis match. Yet, directors "+
                    "seem dead set on including as many cuts as they can to focus on "+
                    "a character's face; this is understandable and warranted to a "+
                    "certain degree, but overdoing this technique stales quickly.  "+
                    "Instead, conversations should give the audience a perspective on "+
                    "the character's body language to better communicate reaction "+
                    "instead of relying on facial expressions to depict emotion. "+
                    "The importance of body language in conversation can' be stated "+
                    "enough, and to remove that element from a conversation leaves "+
                    "the audience with less information to build opinions on. "
                ]
            },

            blog2 : {
                "title" : "Preparation For A Video Transition",
                "date" : "June 22nd, 2020",
                "content" : [
                    "I've decided to invest in a mirrorless camera.<br>It's not going " +
                    "to be anything amazing, just a simple starter camera, but that " +
                    "should be enough to get started filming reviews instead of " +
                    "posting them on SnapChat. I'm going to test whether the green " +
                    "walls of my room can adequately serve as a green screen, " +
                    "otherwise I'll have to order one. A ring light would probably "+
                    "be a smart investment as well. <br>In essence, I'm hoping to create "+
                    "a video journal of sorts that documents my views and opinions "+
                    "on the content I watch and if people happen to enjoy the content "+
                    "then more power to me, I suppose. I'm wary to start because of "+
                    "the potential for negative comments on my videos, but I suppose "+
                    "that's just the cost of getting started on YouTube. <br>When all "+
                    "is said and done, I just want to improve my directing, writing, "+
                    "and editing skills while having fun expressing my thoughts. "
                ]
            },

            blog3 : {
                "title" : "Reflection on \"Da 5 Bloods\"",
                "date" : "June 21st, 2020",
                "content" : [
                    "I've almost finished my review for \"Da 5 Bloods,\" I just have a few final "+
                    "touches to add before continuing to the next film. <br>Originally, I was "+
                    "going to review \"The Last Airbender\" movie as a joke since it's universally "+
                    "regarded as a poor adaptation, but I couldn't even bring myself "+
                    "to finish it. I guess that's a testament to how terrible the film "+
                    "is. <br> Spike Lee's movie dragged on for so many scenes while also "+
                    "ignoring plot points that were established early on. The dialogue "+
                    "was also insufferable at times, with characters committing violent "+
                    "acts for little to no reason, creating a hodgepodge of events that "+
                    "don't coherently contribute to the themes of strength and unity. "+
                    "While the commentary on masculinity after the Vietnam war is potent "+
                    "at points, the poor pacing and questionable (at best) plot leaves "+
                    "much to desire from Spike Lee."
                ]
            }
        });
    }

    blogSetup.prototype.getBlogs = function () {
        /*
            Read through JSON initialized in constructor and return the elements of the blog
            in an array of the format [title, date, content] where each array is a subarray
            of the result 
        */
        let result = [];
        let parsedJSON = JSON.parse(this.blogJSON);
        for (var blog in parsedJSON) {
            let blogInfo = [];
            blogInfo.push(parsedJSON[blog]["title"], parsedJSON[blog]["date"], parsedJSON[blog]["content"].join());
            result.push(blogInfo);
        }
        return result;
    }

    blogSetup.prototype.loadHTML = function(blogs) {
        /*
            Take array from getBlogs and convert each blog array into HTML
        */
        let blogContainerDiv = document.getElementById("blogContainer");
        for (let i = 0; i < blogs.length; i++) {
            let viewTemplate = [
                '<div class="blogEntry">'+
                    '<div class="blogHeaderContainer">'+
                        '<div class="blogTitle">'+
                            '<h2>' + blogs[i][0] + '</h2>'+
                        '</div>'+
                        '<div class="blogDate">'+
                            '<h5>' + blogs[i][1] + '</h5>'+
                        '</div>'+
                    '</div>'+
                    '<div class="blogContent">'+
                        '<p>' + blogs[i][2] + '</p>'+
                    '</div>'+
                '</div>'
            ].join();
            blogContainerDiv.innerHTML += viewTemplate
        }
    }

    window.addEventListener('load', (event) => {
        console.log("CREATING displayBlogs");
        let displayBlogs = new blogSetup();
        console.log("CREATING blogs");
        let blogs = displayBlogs.getBlogs();
        console.log("LOADING HTML");
        displayBlogs.loadHTML(blogs);
    });

}