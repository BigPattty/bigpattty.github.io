document.addEventListener('DOMContentLoaded', () => {
    const contentBoxes = document.querySelectorAll('.content-box');
    const months = document.querySelectorAll('.month');
    
    const onScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight;

        contentBoxes.forEach(box => {
            if (scrollPos > box.offsetTop + box.offsetHeight / 2) {
                box.classList.add('visible');
            }
        });

        months.forEach(month => {
            if (scrollPos > month.offsetTop + month.offsetHeight / 2) {
                month.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', onScroll);
});
