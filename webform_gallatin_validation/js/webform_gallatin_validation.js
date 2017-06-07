/* requires jQuery */

//jQuery wrapper
(function ($) {
  //Define a Drupal behaviour with a custom name
  Drupal.behaviors.gallatinValidation = {
    attach: function (context) {
      //Add an eventlistener to the document reacting on the
      //'clientsideValidationAddCustomRules' event.
      $(document).bind('clientsideValidationAddCustomRules', function(event){
        //Add your custom method with the 'addMethod' function of jQuery.validator
        //http://docs.jquery.com/Plugins/Validation/Validator/addMethod#namemethodmessage
        jQuery.validator.addMethod("validate_netid", function(value, element, param) {
          console.log("add netid to clientsideValidationAddCustomRules");
          return (/^[A-Za-z]{2,}(\d+)/.test()(value)); 
        }, jQuery.format('Value must be a valid NetID'));


        jQuery.validator.addMethod("validate_universityid", function(value, element, param) {
          console.log("add universityID to clientsideValidationAddCustomRules");
          return (/^N\d{8}$/.test()(value)); 
        }, jQuery.format('Value must be a valid University ID'));

      });
    }
  }
})(jQuery);
