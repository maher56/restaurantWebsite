$(() => {
    const fadeTime = 200;
function menu() {
    const numberOfCards = 6;
    const showMore = $("#showMore");
    const target = $("section.ourMenu .menu-content .food-card");
    const buttons = $("section.ourMenu .menu-buttons").children().children();
    let start = -1 , end = -1;
    let order = -1;
    let arr = [];
    let remove = [];
    showAndHide(...buttons.children(".my-btn-active").parent())
    buttons.click(function() {showAndHide(this);})

    showMore.click(() => {
        controleShowing(arr)
        removeing(remove , arr)
        showing(arr)
    });

    function showAndHide(clickedButton) {
        start = -1 , end = -1 , order = -1;
        arr = [] , remove = [];
        target.each((i , e) => {
            if($(e).attr("data-target").includes(`${$(clickedButton).attr("id")}`))
                arr.push(e);
            else
                remove.push(e);
        })
        controleShowing(arr);
        removeing(remove , arr)
        showing(arr)

        $(clickedButton).children().addClass("my-btn-active")
        $(clickedButton).siblings().children().removeClass("my-btn-active")
    }
    function controleShowing(arr) {
        if(arr.length <= numberOfCards) 
        {   
            start = 0 , end = arr.length;
            showMore.hide();
        }
        else if (start === -1 && end === -1) {
            start = 0 ;
            end = numberOfCards;
            showMore.css("display" , "block");
        }    
        else { 
            if(end >= arr.length || start <= 0)
            order = order * -1;
            start += (numberOfCards * order)
            end += (numberOfCards * order)
            showMore.css("display" , "block");
            if(end >= arr.length) {
                showMore.addClass("prev");
                showMore.text("< Previous")
            }
            if(start <= 0){
                showMore.removeClass("prev");
                showMore.text("Next >")
            }
        } 
    }
    function removeing(remove , arr) {
        $(remove).fadeOut(fadeTime);
        for(let i = 0 ; i < start ; i++)
            $(arr[i]).fadeOut(fadeTime);
        for(let i = end ; i < arr.length ; i++)
            $(arr[i]).fadeOut(fadeTime);
    }
    function showing(arr) {
        setTimeout(() => {
            for(let i = Math.max(0 , start) ; i < Math.min(arr.length, end) ; i++){
                $(arr[i]).fadeIn(fadeTime);
            }
        } , fadeTime)
    }
}

function showFAQ() {
    const container = $("section.ourAnswers .answers-content .my-accordion");
    const buttons = $("section.ourAnswers .answers-buttons > div");
    detectedFAQS(buttons.find("#food"))
    buttons.find("> div").on("click" , function() {detectedFAQS(this)})

    const headers = container.children(".my-accordion-header");
    container.children(`.my-accordion-body`).height();
    container.children(`.my-accordion-body`).height(container.children(`.my-accordion-body`).height());
    container.children(`.my-accordion-body`).addClass("hide")

    headers.on("click" , function(i , e) {
        container.children(`.my-accordion-body${$(this).attr("data-target")}`).toggleClass("hide")
    })
    function detectedFAQS(ele) {
        $(ele).siblings().children().removeClass("my-btn-active");
        $(ele).children().addClass("my-btn-active");
        let arr = [] , remove = [];
        const target = $(container.children(`.my-accordion-body`));
        target.each((i , e) => {
            if($(e).attr("data-parent") == $(ele).attr("id"))
                arr.push(e);
            else
                remove.push(e);
        })

        $(remove).parent().fadeOut(fadeTime);
        setTimeout(() => {
            $(arr).parent().fadeIn(fadeTime);
        } , fadeTime)
    }
}




function sayHello() {
    const mainHeader = $(".sayHello h1");
    $(window).on("load" , () => {
        mainHeader.addClass("animate");
    })
}
const mainUl = $(".mainNav .mainUl");
const toggler = $(".toggler");
function toggleMainUl() {
    toggler.removeClass("active");

    
    if ($(window).outerWidth() <= 991) {
        mainUl.addClass("fastShow");
        mainUl.height(mainUl.height() + 20);
        mainUl.removeClass("fastShow");
        mainUl.children().removeClass("show")
        mainUl.addClass("hide");  
    }
    else {
        mainUl.outerHeight("unset");
        mainUl.removeClass("hide");
        mainUl.children().addClass("show");
    } 
    
}

$(".toggler").on("click" , function() {
    $(this).toggleClass("active");
    mainUl.toggleClass("hide")
    mainUl.children().toggleClass("show")
})  


sayHello()

showFAQ()

toggleMainUl()

menu()
$(window).resize(()=> {toggleMainUl()});

})
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        $("body").css("opacity" , 0)
        $("#loader").show(0);
        console.log("not ready yet")
    } else {
        console.log("ready")
        $("body").css("opacity" , 1)
        $("#loader").hide(0);
    }
};