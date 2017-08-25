"use strict";

(function(module) {
    var pageScripts = {};
    
        pageScripts.activateModal = function() {
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
        };

        $("#examples-btn").click(function() {
            if ( $( "#examples-list" ).is( ":hidden" ) ) {
                // $( "#examples-list" ).css( "display", "inline" );
                $( "#examples-list" ).slideDown( "slow" );
            } else {
                // $( "#examples-list" ).hide();
                $( "#examples-list" ).slideUp( "slow" );
            }
        });
    
    

    //module.pageScripts = pageScripts;
    module.pageScripts = pageScripts;
})(window);