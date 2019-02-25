$("#loginUsername, #loginPassword").bind('input propertychange', function () {
    if (!this.value) {
        $(this).removeClass('float-true');
        $(this).prev().removeClass('float-true');
    }
    if (this.value) {
        $(this).addClass('float-true');
        $(this).prev().addClass('float-true');
    }
});

$('.syncDocumentName').keyup(function() {
    var ID = this.getAttribute('id')
    var dInput = this.value;
    $('.document-title-'+ID).html(dInput)
   
    if( $(this).val().length === 0 ) {
        $('.document-title-'+ID).html('No document name')
        $('.document-title-'+ID).addClass('missing-document-name')
    }else {
        $('.document-title-'+ID).removeClass('missing-document-name')
    }
    
});

$('.toggle-route-slip').click(function() {
    $('.routing-slip').toggleClass('toggle-route-slip')
    $('.folder-view').toggleClass('route-slip-collapsed')
})