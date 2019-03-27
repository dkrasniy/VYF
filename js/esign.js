$(document).ready(function () {
    console.log("Get ready to sign!");

    $(document.body).on('click','#engageSignature', function(){
        let clickedElement = this;
        $(clickedElement).addClass('active');
        engageSignature();

        //showHelpDialog('Add Signature', 'Start by clicking and dragging to place a signature box.');
    })
});


function showHelpDialog(title, message){
    $('.helpDialogTitle').text(title); 
    $('.helpDialogDesc').text(message); 
    $('.signHelpDialog').addClass('show')
}

$(document).click(function(e){
    if( $(e.target).closest(".signHelpDialog").length > 0 || $(e.target).closest("#engageSignature").length > 0 ) {
        return false;
    }
    $('.signHelpDialog').removeClass('show')
});

