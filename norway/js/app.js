(function ($) {
    let $priceForm = $("#price-form");
    let formCountry = "no";
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
        "8": "", // email
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

    function resetFormAndPriceData() {
        projectTotal = {
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
        setFormData = {
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
    }

    function resetSelectedValues() {
        // reset back button text
        let backBtnText = (formCountry === "se" ? "Tidigare fråga" : "Forrige spørsmål" );
        $("#go-back-btn .text").html(backBtnText);

        // disable multiple choice buttons
        $(".disabled-by-default").prop('disabled', true);
        // page 3
        $("#options-3 .option-button-3:first-child input[type='radio']").prop("checked", true);
        $("#page-3 .cta .option-button").attr("data-price", 3000);

        // page 6
        $("#options-6 input:checkbox").prop("checked", false);
        projectTotal["page6"] = 0; // set price to 0
        $("#page-6").children(".cta").find(".option-button").first()
            .attr('data-price', 0);


        // page 9
        $("#options-9 .card-check:nth-child(2) input[type='radio']").prop("checked", true);
    }

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
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    // manage new active page
    function newPageActivate(id) {
        $priceForm.attr('data-active-page', id);
        $(".form-page").removeClass("show");
        $("#page-" + id + ".form-page").addClass("show");
        // change text of calculator form to-> start over for submission page (begynne på nytt,Börja om)
        let goBackBtnText = (formCountry === "se" ? "Börja om" : "Begynne på nytt");
        if (id === 10) {
            $("#go-back-btn .text").html(goBackBtnText);
        }
    }

    // update price display
    function updatePriceDisplay() {
        let price = projectTotal.total();
        let formatterPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        setFormData["18"] = `${formatterPrice} kr`;
        $("#display-project-total").html(`${formatterPrice} kr`);
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
            updatePriceDisplay();
            console.log("Current price: " + projectTotal.total());
            console.log(setFormData);
            console.log("---------------------------");
        }
    });

    // go back a page
    $("#go-back-btn").click(function (e) {
        e.preventDefault();
        let activePage = $priceForm.attr('data-active-page');

        if (parseInt(activePage) === 10) {
            moveMentArr = [1];
            formGoTo(1);
            resetSelectedValues(); // for no budget form
            resetFormAndPriceData();
        } else {
            $(this).attr('disabled');
            if (moveMentArr.length > 1) {
                moveMentArr.splice(-1, 1);
            }
            let lastActivePage = moveMentArr[moveMentArr.length - 1];
            if (moveMentArr.length) {
                formGoTo(lastActivePage);
                $(this).removeAttr('disabled');
            }
            console.log(moveMentArr);
        }
    });

    // ========================= page 3 script
    // -------------- page 3 image slider
    const mySiema = new Siema({
        perPage: 1,
        selector: "#pb3-slider",
        draggable: false,
        multipleDrag: false,
        loop: false,
    });

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

        optionButton.prop('disabled', false);

        optionButton.attr('data-price', price);
        optionButton.data('formval', formVal);
        optionButton.data('formkey', formKey);

        // change image slider
        let targetSlide = $(this).attr("data-slider");
        mySiema.goTo(parseInt(targetSlide));
    });

    // ====================== page 5 scripts
    // this page has multiple choices, which can be ignored
    // so if a user chooses from these options
    // then decides to go back/ignore
    // => remove checkbox item price, uncheck them,
        // remove them from submission data object
    $('.option-button[data-formval="Gör själv"]').click(function () {
        // console.log("caution");
        setFormData["8.1"] = ""; // choice 1
        setFormData["8.2"] = ""; // choice 2
        setFormData["8.3"] = ""; // choice 3
        $("#options-6 input:checkbox").prop("checked", false);

        projectTotal["page6"] = 0; // set price to 0

        $("#page-6").children(".cta").find(".option-button").first()
            .attr('data-price', 0);
    });

    // ====================== page 6 scripts
    $("#options-6 input:checkbox").change(function () {
        let total = 0;
        let checkedOptions = $('#options-6 input:checkbox:checked');

        checkedOptions.each(function () { // iterate through each checked element.
            // get total
            total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
            // set form data
            let formVal = $(this).data('formval');
            let formKey = $(this).data('formkey');
            setFormData[formKey] = formVal;
        });

        let optionButton = $("#page-6").children(".cta").find(".option-button").first();

        if (checkedOptions.length) {
            optionButton.prop("disabled", false);
        } else {
            optionButton.prop("disabled", true);
        }
        optionButton.attr('data-price', total);
    });

    // =================== page 9
    $("#options-8 .option-button[data-target-page='10']").click(function () {
        setFormData["11"] = ""; // set to empty choice if any, for hosting
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

    // $("#show-price-btn").click(function () {
    //     updatePriceDisplay();
    // });

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
    let username = formCountry === "se" ? 'ck_204b066e039ea6293ccfe43dac718f616927c814' : 'ck_dafca3a205b303e9d4ad56b7398f49911a0aa013';
    let password = formCountry === "se" ? 'cs_2052b760dec9479e201786167ed3c3a860ea53b5' : 'cs_c71e5ef2d39e4e478717c4d53e1e9f9777a4cf13';

    function submitForm(formData) {
        let settings = {
            "async": true,
            "crossDomain": true,
            // "url": "https://getonnet.se/wp-json/gf/v2/entries/",
            "url": window.location.origin + "/wp-json/gf/v2/entries/",
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

            sendNotification(response.id);
        });
    }

    function sendNotification(id) {
        let settings = {
            "async": true,
            "crossDomain": true,
            // "url": "https://getonnet.se/wp-json/gf/v2/entries/" + id +"/notifications",
            "url": window.location.origin + "/wp-json/gf/v2/entries/" + id +"/notifications",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            },
            "processData": false
        };

        $.ajax(settings).done(function (response) {
            console.log("----------------");
            console.log("Notification sent successfully");
            console.log(response);
            console.log("----------------");
        });
    }
})(jQuery);
