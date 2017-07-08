$(document).ready(function() {
    var options = {
        particleColor: '#bfbfbf',
        background: '#fff',
        interactive: true,
        speed: 'fast',
        density: 'high'
    };

    var particleCanvas = new ParticleNetwork(document.getElementById('particle-canvas'), options);
});