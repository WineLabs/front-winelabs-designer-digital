document.addEventListener('DOMContentLoaded', function () {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.slide-dot');
    const prevBtn = slideshow.querySelector('.slide-btn.prev');
    const nextBtn = slideshow.querySelector('.slide-btn.next');

    let currentSlide = 0;
    const slideIntervalTime = 7000;
    let autoSlideTimer = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!slides.length || !dots.length || slides.length !== dots.length) {
        return;
    }

    function updateAria() {
        slides.forEach(function (slide, i) {
            slide.setAttribute('aria-hidden', i === currentSlide ? 'false' : 'true');
        });
        dots.forEach(function (dot, i) {
            const isActive = i === currentSlide;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
            dot.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    function showSlide(index) {
        slides.forEach(function (slide) {
            slide.classList.remove('active');
        });

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
        updateAria();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    function startAutoSlide() {
        if (prefersReducedMotion) return;
        stopAutoSlide();
        autoSlideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    function resetAutoSlide() {
        startAutoSlide();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            resetAutoSlide();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showSlide(index);
            resetAutoSlide();
        });
    });

    slideshow.addEventListener('mouseenter', stopAutoSlide);
    slideshow.addEventListener('mouseleave', startAutoSlide);
    slideshow.addEventListener('focusin', stopAutoSlide);
    slideshow.addEventListener('focusout', function (event) {
        if (!slideshow.contains(event.relatedTarget)) {
            startAutoSlide();
        }
    });

    slideshow.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextSlide();
            resetAutoSlide();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prevSlide();
            resetAutoSlide();
        }
    });

    showSlide(0);
    startAutoSlide();
});
