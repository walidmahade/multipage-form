(function ($) {
    let $priceForm = $("#price-form");

    $(".option-button").click(function (e) {
        e.preventDefault();
        let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        let nextPage = currentActivePage + 1;
        $priceForm.attr('data-active-page', currentActivePage + 1);

        $(".form-page").removeClass("show");
        $("#page-"+ nextPage +".form-page").addClass("show");
    });
})(jQuery);
