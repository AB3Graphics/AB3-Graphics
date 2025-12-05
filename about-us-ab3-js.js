function highlightSkills() {
    const skills = document.getElementById("skills");
    skills.style.backgroundColor = "#e0f7ff";
    skills.style.transition = "0.5s ease";
}

$(document).ready(function () {
    $("#about-box").hide().fadeIn(1200);
    $("#toggleSkills").click(function () {
        $("#skills").slideToggle(400);
    });
    $("nav").hide().slideDown(700);
    $("button").hover(
        function () {
            $(this).animate({ opacity: 0.85 }, 150);
        },
        function () {
            $(this).animate({ opacity: 1 }, 150);
        }
    );
    $("#about-box ul li").each(function (i) {
        $(this)
            .css("display", "none")
            .delay(200 * i)
            .fadeIn(600);
    });
    $("#about-box").hover(
        function () {
            $(this).css({
                transform: "scale(1.02)",
                transition: "0.2s ease"
            });
        },
        function () {
            $(this).css({
                transform: "scale(1)"
            });
        }
    );
    $("#backToTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    $("a[href^='#']").click(function (event) {
        const target = $(this.getAttribute("href"));
        if (target.length) {
            event.preventDefault();
            $("html, body").animate(
                { scrollTop: target.offset().top },
                600
            );
        }
    });

    $("nav a").hover(
        function () {
            $(this).css({
                color: "#0088cc",
                transition: "0.3s"
            });
        },
        function () {
            $(this).css({
                color: ""
            });
        }
    );

});
