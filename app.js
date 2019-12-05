(function ($) {
    // height adjustment
    // $.each($("#price-form .form-page"), function (i, el) {
    //     $(el).css('height', function () {
    //         let totalHeight = 0;
    //         $(el).children().each(function(){
    //             totalHeight = totalHeight + $(this).outerHeight(true);
    //         });
    //         return totalHeight+'px';
    //     })
    // });
    // END height adjustment

    let $priceForm = $("#price-form");

    // go forward a page
    $(".option-button").click(function (e) {
        e.preventDefault();
        let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        let nextPage = currentActivePage + 1;

        newPageActivate(nextPage);
    });

    // go back a page
    $("#go-back-btn").click(function (e) {
        e.preventDefault();
        let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        let nextPage = currentActivePage - 1;

        newPageActivate(nextPage);
    });

    // manage new active page
    function newPageActivate(id) {
        $priceForm.attr('data-active-page', id);
        $(".form-page").removeClass("show");
        $("#page-"+ id +".form-page").addClass("show");
    }

    // ========================= page 3 styles
    $(".option-button-3").hover( function () {
        $(this).find(".tooltip").addClass("show");
    }, function () {
        $(this).find(".tooltip").removeClass("show");
    });
})(jQuery);
