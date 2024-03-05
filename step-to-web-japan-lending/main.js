(function () {
    const header = document.querySelector(".header");
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add("header_active");
        } else {
            header.classList.remove("header_active");
        }
    };
}());

//Menu burger handler

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header_nav');
    const menuCloseItem = document.querySelector('.header__nav-close');

    burgerItem.addEventListener('click', () => {
        menu.classList.add('header_nav-active');
    })
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header_nav-active');
    })
}());

// scroll
(function () {
    const scroll = function (targetElement, duration) {
        const headerHeight = document.querySelector("header").clientHeight;
        let target = document.querySelector(targetElement);
        let targetPosition = target.getBoundingClientRect().top - headerHeight;
        let startingPoint = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startingPoint, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };
    const scrollTo = function () {
        const links = document.querySelectorAll(".js-scroll");
        links.forEach(each => {
            each.addEventListener("click", function () {
                const currentTarget = this.getAttribute('href');
                scroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());