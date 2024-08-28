document.addEventListener("DOMContentLoaded", function() {
    let isScrolling = false;
    let startY = 0;
    const scrollDelay = 1000; // Задержка между прокрутками

    // Плавная прокрутка при переходе к следующей секции
    window.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            if (e.deltaY > 0) {
                scrollToNextSection();
            } else if (e.deltaY < 0) {
                scrollToPreviousSection();
            }
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, scrollDelay);
        }
    });

    // Поддержка свайпов для мобильных устройств
    window.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;

        if (!isScrolling) {
            if (deltaY > 50) { // Свайп вверх
                scrollToNextSection();
            } else if (deltaY < -50) { // Свайп вниз
                scrollToPreviousSection();
            }
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, scrollDelay);
        }
    });

    function scrollToNextSection() {
        const currentSection = document.querySelector('.section.active');
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveSection(nextSection);
        }
    }

    function scrollToPreviousSection() {
        const currentSection = document.querySelector('.section.active');
        const previousSection = currentSection.previousElementSibling;
        if (previousSection && previousSection.classList.contains('section')) {
            previousSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveSection(previousSection);
        }
    }

    function updateActiveSection(newActiveSection) {
        document.querySelector('.section.active').classList.remove('active');
        newActiveSection.classList.add('active');

        // Обновление активной ссылки навигации
        const navLinks = document.querySelectorAll('.navigationContainer a');
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            const targetId = link.getAttribute('href').substring(1);
            if (newActiveSection.id === targetId) {
                link.classList.add('active-link');
            }
        });
    }

    // Изначально выделяем первую секцию и соответствующую ссылку
    const firstSection = document.querySelector('.section');
    firstSection.classList.add('active');
    document.querySelector(`.navigationContainer a[href="#${firstSection.id}"]`).classList.add('active-link');

    const navLinks = document.querySelectorAll('.navigationContainer a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveSection(targetSection);
            }
        });
    });
});
