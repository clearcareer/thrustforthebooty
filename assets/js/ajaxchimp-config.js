/* === Mail Chimp subscription form settings === */
$( document ).ready(function() {

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        //replace bellow url with your own mailchimp form post url inside the url: "---".
        url: "http://sillyskinny.us3.list-manage.com/subscribe?u=9323f9d9f0b350a8ec35fb576&id=eebf882952" 
    }); 
    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<i class="fa fa-check"></i>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
            
        } else if(resp.result === 'error') {
            $('.subscription-error').html('<i class="fa fa-times"></i>' + resp.msg).fadeIn(1000);
        }  
    }

});