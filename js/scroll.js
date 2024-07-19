document.addEventListener('DOMContentLoaded', () => {
    const infoBoxes = document.querySelectorAll('.info');
    
    const onScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight;

        infoBoxes.forEach(box => {
            if (scrollPos > box.offsetTop + box.offsetHeight / 2) {
                box.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', onScroll);
});
