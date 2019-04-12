$(document).ready(function() {

    $('#loading').hide();

    $(document).on('pjax:send', function() {
        $('#loading').show();
    });
    $(document).on('pjax:complete', function() {
        $('#loading').hide();
    });

    $(document).ajaxStart(function() {
        $('#loading').show();
    });
    $(document).ajaxStop(function () {
        $('#loading').hide();
    });
    $(document).ajaxError(function () {
        $('#loading').hide();
    });



    $('body').on('click', '.js-vacancy-item', function(event){
        event.preventDefault();
        var url = $(this).data('url');
        $.ajax({
            url: url,
            type: 'GET'
        }).done(function(data) {
            $('.js-vacancy-item-wrap').html(data);
            $('#vacancyModal').modal('show');
        }).fail(function() {
            alert( "error" );
        });
        return false;
    });




    $('body').on('click', '.js-candidate-item', function(event){
        event.preventDefault();
        var url = $(this).data('url');
        $.ajax({
            url: url,
            type: 'GET'
        }).done(function(data) {
            $('.js-candidate-item-wrap').html(data);
            $('#candidateModal').modal('show');
        }).fail(function() {
            alert( "error" );
        });
        return false;
    });





    $('#vacancy-position_id').on('change', function() {
        vacancyTypeToggler();
    });

    $(window).on('load', function() {
        vacancyTypeToggler();
    });

    function vacancyTypeToggler() {
        elem = $('#vacancy-position_id');
        var type_id = elem.find(':selected').attr('data-type-id')
        if (parseInt(type_id) === 1){
            $('.js-vacancy-type-toggle').show();
        } else {
            $('.js-vacancy-type-toggle').hide();
        }
    }

    $('.js-popup').on('click', function(){
        $($(this).data('target')).modal('show')
            .find('.modalContent')
            .load($(this).attr('data-url'));
        return false;
    });


    var timer = new easytimer.Timer();
    var duration = parseInt( $('#testingDuration').text());
    timer.start({countdown: true, startValues: {seconds: duration}});
    $('#countdownTesting .values').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function (e) {
        $('#countdownTesting .values').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function (e) {
        $('form#testingForm').submit();
    });



});