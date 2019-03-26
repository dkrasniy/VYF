$(document).ready(function(){
    checkFolderStatus();
    feather.replace();
    checkForDarkMode();
    checkForSideNavigation();
});

$(document.body).on("input propertychange",'.float-labels input', function () {

    if (!this.value) {
        $(this).removeClass('float-true');
        $(this).prev().removeClass('float-true');
    }
    if (this.value) {
        $(this).addClass('float-true');
        $(this).prev().addClass('float-true');
    }
})



$(document.body).on("keyup",".syncDocumentName",function() {
    var ID = this.getAttribute('id')
    var dInput = this.value;
    $('.document-title-'+ID).html(dInput)
   
    if( $(this).val().length === 0 ) {
        $('.document-title-'+ID).html('Please provide document name')
        $('.document-title-'+ID).addClass('missing-document-name')
    }else {
        $('.document-title-'+ID).removeClass('missing-document-name')
    }
});


$(document.body).on("click", '.toggle-route-slip', function() {
    $('.routing-slip').toggleClass('toggle-route-slip')
    $('.folder-view').toggleClass('route-slip-collapsed')
})

//Link Upload Documents button to file upload 
$(function(){
    $("#upload_documents").on('click', function(e){
        e.preventDefault();
        $("#fileElem").trigger('click');
    });
});


//Toggle empty folder state 
function checkFolderStatus () {
    if ( $('#filesListing').children().length > 0 ) {
        $('.empty-state-x').addClass('hidden')
    } else {
        $('.empty-state-x').removeClass('hidden')
    }
}


$(document.body).on("click", ".document-expand-menu .dropdown-item", function(event){
    event.stopPropagation();
    var thisModal = $(this).attr('data-target');
    $(thisModal).modal('show');

})

//DARK MODE
function checkForDarkMode() {
    let isDarkMode = false;
    isDarkMode = JSON.parse(localStorage.getItem("darkmode"));
    isDarkMode ? (document.body.classList.add("darkModeEnabled")) : document.body.classList.remove("darkModeEnabled");
}

//Side Nav
function checkForSideNavigation() {
    let isSideNav = false;
    isSideNav = JSON.parse(localStorage.getItem("isSideNav"));
    isSideNav ? (document.body.classList.add("sideNavigationEnabled")) : document.body.classList.remove("sideNavigationEnabled");
}