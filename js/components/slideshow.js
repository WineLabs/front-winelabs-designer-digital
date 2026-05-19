// Espera todo o HTML ser carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');

    let currentSlide = 0;
    const slideIntervalTime = 7000;
    let autoSlideTimer;

    if (!slides.length || !dots.length || slides.length !== dots.length) {
        return;
    }

    function showSlide(index) {
        // Remove a classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Ajusta o índice
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Ativa o slide atual e o indicador correspondente
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Garante que o texto mostrado venha do atributo data-label (fallback para conteúdo atual)
        const labelEl = slides[currentSlide].querySelector('.slide-label');
        if (labelEl) {
            const labelText = slides[currentSlide].dataset.label || labelEl.textContent;
            labelEl.textContent = labelText;
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    // Botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });
    }

    // Botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });
    }

    // Clique nos indicadores
    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Inicializa o slideshow e o temporizador automático
    showSlide(currentSlide);
    autoSlideTimer = setInterval(nextSlide, slideIntervalTime);
});
