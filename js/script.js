// Declaration of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();

document.ready(
    // toggleTheme function.
    // This script shouldn't be changed.
    () => {
        var _Blog = window._Blog || {};
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';  // Fix: Check if current theme is 'dark'
        const pagebody = document.getElementsByTagName('body')[0];
        
        // Initialize theme based on localStorage or default to 'light'
        if (isDark) {
            document.getElementById("switch_default").checked = true;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark";
            pagebody.classList.add('dark-theme');
        } else {
            document.getElementById("switch_default").checked = false;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Light";
            pagebody.classList.remove('dark-theme');
        }

        _Blog.toggleTheme = function () {
            // Toggle theme when the switch button is clicked
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                    window.localStorage.setItem('theme', 'light');
                    document.getElementById("mobile-toggle-theme").innerText = "· Light";
                } else {
                    pagebody.classList.add('dark-theme');
                    window.localStorage.setItem('theme', 'dark');
                    document.getElementById("mobile-toggle-theme").innerText = "· Dark";
                }
            });

            // Mobile toggle theme functionality
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                    window.localStorage.setItem('theme', 'light');
                    document.getElementById("mobile-toggle-theme").innerText = "· Light";
                } else {
                    pagebody.classList.add('dark-theme');
                    window.localStorage.setItem('theme', 'dark');
                    document.getElementById("mobile-toggle-theme").innerText = "· Dark";
                }
            });
        };
        _Blog.toggleTheme();
        // Ready function
    }
);
