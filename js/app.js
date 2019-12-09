(function ($) {
    let $priceForm = $("#price-form");
    // save user movement from page to page for going back
    let moveMentArr = [1]; // 1 is the homepage
    let setFormData = {
        "form_id": "2", // add this entry to which form
        "status": "active", // entry status
        "4": "", // pages client needs
        "5": "", // design quality
        "6": "", // recive payments functions
        "7": "", // need help with content?
        "8.1": "", // selected content
        "8.2": "", // selected content
        "8.3": "", // selected content
        "9": "", // third party integration?
        "10": "", // do you need support and hosting?
        "11": "", // support and hosting plan
        "16": "", // username
        "14": "", // userphone
        "13": "" // user email
    }

    // save price for each page, 
    // to ebable going back and recalculating values
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

    // manage new active page
    function newPageActivate(id) {
        $priceForm.attr('data-active-page', id);
        $(".form-page").removeClass("show");
        $("#page-" + id + ".form-page").addClass("show");
    }

    // go forward a page
    $(".option-button").click(function (e) {
        e.preventDefault();
        let pageNo = parseInt($(this).attr('data-target-page'));

        // keep page no track
        moveMentArr.push(pageNo);
        console.log("page serial: " + moveMentArr);

        // calculate total
        let getPrice = $(this).attr('data-price') ? $(this).attr('data-price') : 0;
        let getPricePageName = $(this).attr('data-price-name') ? $(this).attr('data-price-name') : 0;
        projectTotal[getPricePageName] = parseInt(getPrice);
        console.log("Current price: " + projectTotal.total());
        // go next
        formGoTo(pageNo);
    });

    // go back a page
    $("#go-back-btn").click(function (e) {
        e.preventDefault();
        // let currentActivePage = parseInt($priceForm.attr('data-active-page'));
        // if (currentActivePage === 12) {
        //     formGoTo(1);
        // } else {
        //     formPagePrev();
        // }
        moveMentArr.splice(-1, 1);
        let lastActivePage = moveMentArr[moveMentArr.length - 1];
        formGoTo(lastActivePage);
        console.log(moveMentArr);
    });

    // form submission
    // $(".form_submit_btn").click(function (e) {
    // e.preventDefault();
    // check if form fields are empty

    // handle form submission here, then go to next page
    // formPageNext();
    // });
    $("#main-form").submit(function (e) {
        e.preventDefault();
        formPageNext();
    });

    // ========================= page 3 script
    $(".option-button-3").hover(function () {
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
        $('input:checkbox:checked').each(function () { // iterate through each checked element.
            total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
        });

        $("#page-6").children(".cta").find(".option-button").first()
            .attr('data-price', total);
    });

    // =================== page 9
    $("#show-price-btn").click(function () {
        $("#display-project-total").html(`${projectTotal.total()} kr`)
    });

    // ================= submit form to site
    function submitForm(formdata) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://wordpress-338259-1080455.cloudwaysapps.com/wp-json/gf/v2/entries/",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Basic Y2tfYzExYTIyMzViOGE3NTNhNzE2MTBhZmY4NTNmZTQ2ZWRlZDgwZWE0Yzpjc18wMDJlNTk2YzFmNzFhYWIwMzQzYzg2NzNkNjkwMTEwNzA4OGMxYWMz",
                "Accept-Encoding": "gzip, deflate",
            },
            "processData": false,
            "data": JSON.stringify(formdata)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }


})(jQuery);
