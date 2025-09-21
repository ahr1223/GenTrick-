  document.addEventListener('DOMContentLoaded', () => {
        const modalOverlay = document.querySelector('.modal-overlay');
        const modal = document.querySelector('.modal');
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        const closeModalBtn = document.querySelector('.close-btn');

        const openModal = () => {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            modal.classList.remove('active');
        };

        openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        }));
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const headerActions = document.querySelector('.header-actions');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            headerActions.classList.toggle('active');
        });
    });