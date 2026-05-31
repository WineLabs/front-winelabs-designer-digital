document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario-contato');
    if (!form) return;

    const email = form.dataset.email || 'douglas@gmail.com';

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const userEmail = form.querySelector('[name="email"]').value.trim();
        const subjectField = form.querySelector('[name="subject"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        const subject = encodeURIComponent('Contato Winelabs — ' + (subjectField || name));
        const body = encodeURIComponent(
            'Nome: ' + name + '\nE-mail: ' + userEmail + '\nAssunto: ' + subjectField + '\n\nDescrição:\n' + message
        );

        window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    });
});
