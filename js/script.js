
document.addEventListener("DOMContentLoaded", () => {
    fetch('/db/data.json')
        .then(res => res.json())
        .then(data => {

            document.getElementById('nickname').textContent = data.nickname;
            document.getElementById('greeting').textContent = data.greeting + " ";
            document.getElementById('name').textContent = data.name;
            document.getElementById('title').textContent = data.title;
            document.getElementById('summary').textContent = data.summary;
            document.getElementById('description').textContent = data.description;

            //

            const skillsContainer = document.getElementById('skills');

            data.skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill');

                const name = document.createElement('div');
                name.classList.add('skill-name');
                name.textContent = skill;

                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');

                const progress = document.createElement('div');
                progress.classList.add('progress');

                const percent = Math.floor(Math.random() * 41) + 60;
                progressBar.appendChild(progress);
                skillDiv.appendChild(name);
                skillDiv.appendChild(progressBar);
                skillsContainer.appendChild(skillDiv);
                
                setTimeout(() => {
                    progress.style.width = `${percent}%`;
                }, 100);
            });

            // 

            const experienceDiv = document.getElementById('experience');
            data.experience.forEach(exp => {
                const entry = document.createElement('div');
                entry.innerHTML = `
            <strong>${exp.role}</strong> en ${exp.company} (${exp.years})
            <p>${exp.description}</p>
          `;
                experienceDiv.appendChild(entry);
            });
        });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        const element = document.getElementById('content');
        const opt = {
            margin: 0.5,
            filename: 'mi_portafolio.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    });

});
