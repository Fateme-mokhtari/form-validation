function isValide(feildType, value) {

    var regEx;
    switch (feildType) {
        case 'mobileNumber':
            regEx = /^(09)[0-9]{9}/;
            break;
        case "emailAaddress":
            regEx = /\S+@\S+\.\S+/;
            break;
        case "text":
            regEx = /^[a-zA-Z ]+$/;
            break;
        case "password":
            regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            break;
        case "persianChar":
            regEx = /^[\u0600-\u06FF\s]+$/;
            break;
        case "englishChar":
            regEx = /^[a-zA-Z0-9]*$/;
            break;
    }
    return regEx.test(value);

}

(function ($) {


    $.fn.validator = function (feilds, messages) {
        this.submit(function (event) {

            var message = "";

            for (var key in feilds) {
                $('#' + key).removeClass("border border-danger");
                var feildType = feilds[key];
                var value = $(this).find('#' + key).val();

                if (value == "" && feildType.required == true) {

                    // alert(messages[key].required)
                    message += messages[key].required + '<br/>';
                    $('#' + key).addClass("border border-danger");
                    event.preventDefault();

                }
                if (value != "" && feildType.required == true) {

                    if (isValide(feildType.valueType, value) === false) {
                        message += messages[key].valueType + '<br/>';
                        // alert(messages[key].valueType);
                        $('#' + key).addClass("border border-danger");
                        event.preventDefault();
                    }
                }

                if (value != "" && feildType.required == false) {

                    if (isValide(feildType.valueType, value) === false) {
                        message += messages[key].valueType + '<br/>';
                        // alert(messages[key].valueType);
                        $('#' + key).addClass("border border-danger");
                        event.preventDefault();
                    }
                }
            }
            $('#errorList').html(message).addClass('p-3');
        });

    };



})(jQuery);