{
    window.onload = function() {
        let viewTemplate = [
            '<div class="contactLinks">' +
            '<a href="https://github.com/krowngold">' +
                '<img class="githubLogo" src="../images/github.png" alt="Noah\'s GitHub profile">' +
            '</a>' +
            '<a href="https://www.linkedin.com/in/noah-k">' +
                '<img class="linkedInLogo" src="../images/linked.png" alt="Noah\'s LinkedIn profile">' +
            '</a>' +
        '</div>' +
        '<div class="contactInfo">' +
            '<h4>Contact me</h4>' +
            '<h5>Noah Krohngold<br>(425)591-9823<br>Noah.Krohngold@gmail.com<br>' +
                'University of Washington Computer Science and Engineering</h5>' +
        '</div>'
        ].join();
        document.getElementById("footerContainer").innerHTML += viewTemplate;
    }
}