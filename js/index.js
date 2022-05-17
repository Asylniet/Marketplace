window.addEventListener('load', function () {
    document.addEventListener('mousemove', function(e) {
        document.querySelectorAll('.parallax').forEach(layer => {
            const speed = layer.getAttribute('data-speed');

            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
});