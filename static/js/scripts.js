$(document).ready(function() {
    console.log('scripts.js loaded');
    var scriptsModule = (function() {
        var scriptsObj = {};

        scriptsObj.activateModal = function() {
            var original_ele = document.getElementsByClassName('output-container')[0];

            $("#modal-btn").click(function(){
                var cln = original_ele.cloneNode(true);
                var modalEl = cln;
                modalEl.style.width = '600px';
                modalEl.style.height = 'auto';
                modalEl.style.margin = '100px auto';
                modalEl.style.padding = '15px';
                modalEl.style.background = 'white';
                modalEl.style.borderradius = '5px;';

                modalEl.style.backgroundColor = '#fff';

                // show modal
                mui.overlay('on', modalEl);
            });
            return scriptsObj;
        };
    }());
    module.exports = scriptsModule;
});
console.log(scriptsModule);