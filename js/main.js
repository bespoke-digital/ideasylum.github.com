
// limit that scope!
(function(){
    // these get assigned on page load
    var topSelector, bottomSelector;
    
    var logoPositions = {
        'consy': ['top', 'left'],
        'tj': ['top', 'mid'],
        'bd': ['top', 'right'],
        'fio': ['bottom', 'left'],
        'za': ['bottom', 'mid'],
        'ss': ['bottom', 'right']
    };
    
    var animateSelector = function(site){
        // animates the selector graphic and displays the content.
        var pos = logoPositions[site];
        var loc;
        switch(pos[1]){
            case 'left':
                loc = '16%';
                break;
            case 'mid':
                loc = '50%';
                break;
            case 'right':
                loc = '84%';
                break;
        }
        if (pos[0] == 'top'){
            if (bottomSelector.position().left != -20){
                bottomSelector.animate({'left': '-20px'}, 500, function(){
                    animateSelector(site);
                });
            }else{
                topSelector.animate({'left': loc}, 500);
            }
        }else{
            if (topSelector.position().left != 960){
                topSelector.animate({'left': '960px'}, 500, function(){
                    animateSelector(site);
                });
            }else{
                bottomSelector.animate({'left': loc}, 500);
            }
        }
        
    };
    
    var siteDetector = function(node){
        // converts the clicked-on logo img into a convenient short string
        // identifying the site.
        var site;
        switch($(node).attr('alt')){
            case 'Tweep Jumber':
                site = 'tj';
                break;
            case 'SolarShip':
                site = 'ss';
                break;
            case 'Beat District':
                site = 'bd';
                break;
            case 'Fio':
                site = 'fio';
                break;
            case 'Connectsy':
                site = 'consy';
                break;
            case 'Mazava':
                site = 'za';
                break;
        }
        return site;
    };
    
    var showDesc = function(site){
        if($('#desc-'+site+':visible').length > 0){
            return;
        }else if ($('.logo-desc:visible').length > 0){
            $('.logo-desc:visible').fadeOut(400, function(){
                showDesc(site);
            });
        }else{
            $('#desc-'+site).fadeIn(400);
        }
    };
    
    $(function(){
        // grab the selector nodes for use later
        topSelector = $('#desc-selector-top img').show();
        bottomSelector = $('#desc-selector-bottom img').show();
        
        $('#portfolio li img').click(function(e){
            var site = siteDetector(this);
            if ($('#portfolio-desc:visible').length > 0){
                if ($('#desc-'+site+':visible').length > 0){
                    $('#desc-'+site+':visible').fadeOut(500);
                    $('#portfolio-desc').slideUp(500);
                }
                animateSelector(site);
                showDesc(site);
            }else{
                $('#portfolio-desc').slideDown(500, function(){
                    animateSelector(site);
                    showDesc(site);
                });
            }
        });
        
        $('.logo-desc a img').parent().fancybox();
    });
})();


