(function ($) {
    let $priceForm = $("#price-form");
    // save user movement from page to page for going back
    let moveMentArr = [1]; // 1 is the homepage

    let activeForm = ""; // change on "has-budget/ no-budget"

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
        "13": "", // user email
        "18": 0, // budget
    };

    let setFormData2 = {
        "form_id": "3", // add this entry to which form
        "status": "active", // entry status
        "1": "", // when do you want to start
        "2": "", // your budget
        "3": "", // project description
        "4": "", // name
        "5": "", // phone
        "6": "", // email
        "7": "", // website
    };

    // set active form (choose from 2 forms)
    $("#options-1").on('click', '.option-button', function () {
        activeForm = $(this).attr("data-form-target");
        console.log("active form: " + activeForm);
    });

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

        // calculate total at this point
        let getPrice = $(this).attr('data-price') ? $(this).attr('data-price') : 0;
        let getPricePageName = $(this).attr('data-price-name') ? $(this).attr('data-price-name') : 0;
        projectTotal[getPricePageName] = parseInt(getPrice);
        console.log("Current price: " + projectTotal.total());
        // go to next page
        formGoTo(pageNo);

        // collect form data
        let formVal = $(this).data('formval');
        let formKey = $(this).data('formkey');

        if (activeForm === "has-budget") {
            setFormData2[formKey] = formVal;
            console.log(setFormData2);
            console.log("---------------------------");
        } else if (activeForm === "no-budget") {
            setFormData[formKey] = formVal;
            console.log(setFormData);
            console.log("---------------------------");
        }
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

    // ========================= page 3 script
    $(".option-button-3").hover(function () {
        $(this).find(".tooltip").addClass("show");
    }, function () {
        $(this).find(".tooltip").removeClass("show");
    });

    $(".option-button-3").click(function () {
        let price = $(this).attr('data-price');
        let formVal = $(this).data('formval');
        let formKey = $(this).data('formkey');

        let optionButton = $(this).parent()
            .siblings(".cta")
            .find(".option-button");

        optionButton.attr('data-price', price);
        optionButton.data('formval', formVal);
        optionButton.data('formkey', formKey);
    });

    // ====================== page 6 scripts
    $("#options-6 input:checkbox").change(function () {
        let total = 0;

        $('#options-6 input:checkbox:checked').each(function () { // iterate through each checked element.
            // get total
            total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
            // set form data
            let formVal = $(this).data('formval');
            let formKey = $(this).data('formkey');
            setFormData[formKey] = formVal;
        });

        $("#page-6").children(".cta").find(".option-button").first()
            .attr('data-price', total);
    });

    // =================== page 9
    $("#options-9 .card-check").click(function () {
        // set form data
        let formVal = $(this).data('formval');
        // let formKey = $(this).data('formkey');
        // setFormData[formKey] = formVal;
        let optionButton = $(this).parent()
            .siblings(".cta")
            .find(".option-button");
        optionButton.data('formval', formVal);
    });

    $("#show-price-btn").click(function () {
        $("#display-project-total").html(`${projectTotal.total()} kr`);
        setFormData["18"] = `${projectTotal.total()} kr`;
    });

    // ============== form submission (no-budget)
    $("#main-form").submit(function (e) {
        e.preventDefault();
        // visual update
        $("#main-form button[type='submit']").html(`<div id="loader"></div>`);
        // collect user,phone,mail
        $.when(
            $.each($("#main-form input"), function (i, el) {
                let formVal = $(el).val();
                let formKey = $(el).data('formkey');
                setFormData[formKey] = formVal;
            })
        ).then(function () {
            console.log(setFormData);
            // send req to save form
            submitForm(setFormData);
        });
    });

    // ============== form submission (has-budget)
    $("#main-form-2").submit(function (e) {
        e.preventDefault();
        // visual update
        $("#main-form-2 button[type='submit']").html(`<div id="loader"></div>`);
        // collect user,phone,mail
        $.when(
            $.each($("#main-form-2 input"), function (i, el) {
                let formVal = $(el).val();
                let formKey = $(el).data('formkey');
                setFormData2[formKey] = formVal;
            })
        ).then(function () {
            console.log(setFormData2);
            // send req to save form
            submitForm(setFormData2);
        });
    });
    // ===============  form 2 scripts START
    $("#about-project-form-2").change(function () {
        let fieldValue = $(this).val();
        let optionButton = $(this).parent()
            .siblings(".cta")
            .find(".option-button");
        optionButton.data('formval', fieldValue);
    });
    // ===============  form 2 scripts END

    // ================= submit form to site
    let username = 'ck_204b066e039ea6293ccfe43dac718f616927c814';
    let password = 'cs_2052b760dec9479e201786167ed3c3a860ea53b5';

    function submitForm(formData) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://getonnet.se/wp-json/gf/v2/entries/",
            // "url": window.location.origin + "/wp-json/gf/v2/entries/",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            },
            "processData": false,
            "data": JSON.stringify(formData)
        };

        $.ajax(settings).done(function (response) {
            // console.log(response);
            formGoTo(11);
        });
    }


})(jQuery);
