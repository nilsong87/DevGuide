
    // Framework Selection Logic
    document.querySelectorAll('.choose-framework').forEach(button => {
        button.addEventListener('click', function() {
            const framework = this.dataset.framework;
            
            // Hide all results first
            document.querySelectorAll('.framework-result').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show selected result
            document.getElementById(`${framework}-result`).style.display = 'block';
            document.getElementById('selected-framework').textContent = 
                framework.charAt(0).toUpperCase() + framework.slice(1);
            
            // Show result container
            document.getElementById('framework-result').style.display = 'block';
            
            // Scroll to result
            document.getElementById('framework-result').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Celebration effect
            if (framework === 'react') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#61dafb', '#000']
                });
            } else if (framework === 'angular') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#dd0031', '#fff']
                });
            } else {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#42b983', '#34495e']
                });
            }
        });
    });
