function update_design_footer(){
    var widthContact = document.getElementById('contact').offsetWidth;
    var widthArticlesRecents = document.getElementById('articlesRecents').offsetWidth;
    var widthSitesDeReferences = document.getElementById('sitesDeReferences').offsetWidth;
    
    var widthCorps = $('#corps').width(); // largeur sans padding
    
    var leftSpace = widthCorps - widthSitesDeReferences - widthArticlesRecents - widthContact;
    
    if (leftSpace < 0) {
        console.log("Il n'y a pas assez d'espace pour afficher tous les éléments sur une même ligne"); // to remove.
    }

    if (window.innerWidth < 1024) {
        document.getElementById("contact").style.marginRight = 0 + "px";
        document.getElementById("articlesRecents").style.marginRight = 0 + "px";  
    }
    
    else if (window.innerWidth >= 1024) {
        var contactMarginRight = (2*leftSpace)/3;
        var widthArticlesRecents = leftSpace - contactMarginRight;
        document.getElementById("contact").style.marginRight = contactMarginRight + "px";
        document.getElementById("articlesRecents").style.marginRight = widthArticlesRecents + "px";  
    }  
}

function update_design_images(){
    design_corps_responsive();
    var widthCorps = $("#corps").width();
    $('.conteneurImageSeule').each(function(){
        
        // Dabbord remettre les margin originale pour que la div parente aie la bonne taille.
        if ($(this).hasClass("imgFloatRight")) {
            $(this).children().first().css("margin-left", 30 + "px");
            $(this).children().first().css("margin-right", 0 + "px");
        }
        else {
            $(this).children().first().css("margin-left", 0 + "px");
            $(this).children().first().css("margin-right", 30 + "px");
        }
            
        var widthElementCourant = $(this).width();
        
        // Si l'image à un parent ul alors on récupère son width (car il faut tenir compte du padding)
        // Sinon le width du corps est bon.
        var widthUlOuCorps = widthCorps;
        if ($(this).parents('ul').length) {
            widthUlOuCorps = $(this).parents('ul').width();
        }
        
        var nbImages = $(this).find('img').length;
                
        if (widthElementCourant/widthCorps > 0.7 && (nbImages == 1)) {
            $(this).find('img').css("max-width", widthCorps + "px");
            $(this).children().first().css("display", "block");
            
            var widthDivImg = $(this).find('img').width();
            $(this).children().first().css("margin-left", (widthUlOuCorps-widthDivImg)/2 + "px");
            $(this).children().first().css("margin-right", (widthUlOuCorps-widthDivImg)/2 + "px");
        }
        else {
            $(this).find('img').css("max-width", widthCorps + 30 + "px");
            $(this).children().first().css("display", "inline-block");
            
            if ($(this).hasClass("imgFloatRight")) {
                $(this).children().first().css("margin-left", 30 + "px");
                $(this).children().first().css("margin-right", 0 + "px");
            }
            else {
                $(this).children().first().css("margin-left", 0 + "px");
                $(this).children().first().css("margin-right", 30 + "px");
            }
        }      
        
    });
    
    $('.conteneurImages').each(function(){
        var widthElementCourant = $(this).width();
        var nbImages = $(this).find('img').length;
        
        if (widthElementCourant/widthCorps > 0.7 && nbImages == 1) {
            $(this).find('img').css("margin-left", "0px");
            $(this).find('img').css("margin-right", "0px");
            $(this).find('img').css("max-width", widthCorps + "px");
            $(this).children().first().css("display", "inline-block");
        }
        else {
            $(this).find('img').css("margin-left", "20px");
            $(this).find('img').css("margin-right", "20px");
            $(this).find('img').css("max-width", widthCorps - 40 + "px");
            $(this).children().first().css("display", "inline-block");
        }      
        
    });
}


function update_design_when_header_loaded(){
    design_menus_responsive();
    update_design_images();
}

function changements_generaux_onresize() {
    open_or_close_menu_gauche_onresize();
    open_or_close_menu_droite_onresize();
    design_corps_responsive();
    update_design_when_header_loaded();
    update_design_footer();
}

window.onresize = function() {
    changements_generaux_onresize();
};