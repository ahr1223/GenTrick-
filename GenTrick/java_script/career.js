document.addEventListener('DOMContentLoaded', () => {
    const salaryRange = document.getElementById('salary-range');
    if (salaryRange) {
        salaryRange.addEventListener('input', (e) => {
            document.getElementById('salary-value').textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(e.target.value);
        });
    }
    const modalOverlay = document.querySelector('.modal-overlay');
    const jobModal = document.querySelector('.job-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = jobModal.querySelector('.close-btn');
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        jobModal.classList.remove('active');
    };
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.querySelectorAll('.job-card').forEach(card => {
        card.querySelector('.btn-details').addEventListener('click', () => {
            const title = card.dataset.title;
            const company = card.dataset.company;
            const description = card.dataset.description;
            const skills = card.querySelector('.skills-tags').dataset.skills.split(',');
            
            modalContent.innerHTML = `
                <h2>${title}</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">${company}</p>
                <p>${description}</p>
                <div class="skills-section">
                    <h4>Required Skills:</h4>
                    <div class="skills-tags">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
            modalOverlay.classList.add('active');
            jobModal.classList.add('active');
        });
        const saveBtn = card.querySelector('.btn-save');
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveBtn.classList.toggle('saved');
            saveBtn.textContent = saveBtn.classList.contains('saved') ? 'Saved ✓' : 'Save Job';
        });
    });
});