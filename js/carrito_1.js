document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.Card').forEach(card => {
        const incrementButton = card.querySelector('.increment');
        const decrementButton = card.querySelector('.decrement');
        const counter = card.querySelector('.counter');
        
        let count = 0;

        incrementButton.addEventListener('click', () => {
            count++;
            counter.textContent = count;
            decrementButton.style.display = count > 0 ? 'inline-block' : 'none';
        });

        decrementButton.addEventListener('click', () => {
            if (count > 0) {
                count--;
                counter.textContent = count;
                decrementButton.style.display = count > 0 ? 'inline-block' : 'none';
            }
        });

        // Inicialmente oculta el botón de decremento si el contador está en 0
        decrementButton.style.display = 'none';
    });
});
