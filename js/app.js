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
    let projectTotal = {
        "page1": 0,
        "page2": 0,
        "page3": 0,
        "page4": 0,
        "page5": 0,
        "page6": 0,
        "page7": 0,
        "page8": 0,
        "page9": 0,
        total: function () {
            return (this.page1 + this.page2 + this.page3
                + this.page4 + this.page5 + this.page6 + this.page7
                + this.page8 + this.page9)
        }
    };

    function formPageNext() {
        let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        let nextPage = currentActivePage + 1;

        newPageActivate(nextPage);
    }

    function formPagePrev() {
        let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        let nextPage = currentActivePage - 1;

        newPageActivate(nextPage);
    }

    function formGoTo(pageNo) {
        newPageActivate(pageNo);
    }

    // go forward a page
    $(".option-button").click(function (e) {
        e.preventDefault();
        let pageNo = parseInt($(this).attr('data-target-page'));
        // calculate total
        let getPrice = $(this).attr('data-price') ? $(this).attr('data-price') : 0;
        let getPricePageName = $(this).attr('data-price-name') ? $(this).attr('data-price-name') : 0;
        projectTotal[getPricePageName] = parseInt(getPrice);
        console.log(projectTotal.total());
        // go next
        formGoTo(pageNo);
    });

    // go back a page
    $("#go-back-btn").click(function (e) {
        e.preventDefault();
        formPagePrev();
    });

    // manage new active page
    function newPageActivate(id) {
        $priceForm.attr('data-active-page', id);
        $(".form-page").removeClass("show");
        $("#page-"+ id +".form-page").addClass("show");
    }

    // form submission
    $(".form_submit_btn").click(function (e) {
        e.preventDefault();
        // handle form submission here, then go to next page
        formPageNext();
    });

    // ========================= page 3 script
    $(".option-button-3").hover( function () {
        $(this).find(".tooltip").addClass("show");
    }, function () {
        $(this).find(".tooltip").removeClass("show");
    });
    $(".option-button-3").click(function () {
        let price = $(this).attr('data-price');
        $(this).parent().siblings(".cta")
            .find(".option-button").attr('data-price', price);
    });

    // ====================== page 6 scripts
    // $("#page-6 .check-option").click(function () {
    //     let price = $(this).attr('data-price');
    //     let currentPrice = parseInt($(this).parent()
    //         .siblings(".cta")
    //         .find(".option-button")
    //         .attr('data-price'));
    //
    //     $(this).parent().siblings(".cta")
    //         .find(".option-button").attr('data-price', (currentPrice + price));
    // });

    $("#options-6 input:checkbox").change(function () {
        let total = 0;
        $('input:checkbox:checked').each(function(){ // iterate through each checked element.
            total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
        });

        $("#page-6").children(".cta").find(".option-button").first()
            .attr('data-price', total);
    });
    // =================== page 9
    $("#show-price-btn").click(function () {
        $("#display-project-total").html(`${projectTotal.total()} kr`)
    });
})(jQuery);
