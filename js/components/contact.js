document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const email = form.dataset.email || 'douglas@gmail.com';

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const userEmail = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        const subject = encodeURIComponent('Contato Winelabs — ' + name);
        const body = encodeURIComponent(
            'Nome: ' + name + '\nE-mail: ' + userEmail + '\n\nMensagem:\n' + message
        );

        window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    });
});
