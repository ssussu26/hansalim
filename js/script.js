// 모든 html, css 가 준비가 된다면
// 그때 jQuery 실행하라.
$(document).ready(function () {
    // 항상 js 코드의 시작자리(엔트리포인트)
    //nice scroll
    $(function () {
        $(".recipe-choice-list").niceScroll({
            cursoropacitymax: 0.5
        });
        $(".cate-all").niceScroll({
            cursoropacitymax: 0.5
        });
    });


    // 주의사항!!!!!! 두번 이상 작성하시면. 위의 문장은 무시된다.
    // window.onload = function(){
    // 준비가 되면 실행 코드 작성
    // }

    // 카테고리 기능
    var btAll = $('.bt-all');
    var catAllWrap = $(".cate-all-wrap");
    var cateListA = $(".cateList a");
    var dep2 = $(".dep2");
    var cateSubAll = $(".cate-sub-all");
    cateSubAll.mouseenter(function () {
        catAllWrap.addClass("cate-all-wrap-active");
    })
    cateSubAll.mouseleave(function () {
        catAllWrap.removeClass("cate-all-wrap-active");
    })

    $.each(cateListA, function (index) {
        $(this).mouseenter(function () {
            catAllWrap.addClass("cate-all-wrap-active");
            // 일단 dep2 는 모두 숨긴다.
            dep2.hide();
            // 그리고 [index] 만 보여줘.
            dep2.eq(index).show();
        });

        $(this).mouseleave(function () {
            catAllWrap.removeClass("cate-all-wrap-active");
        });
    });
    // .click .mouseenter .mouseleave .hover 설명

    //타이머를 이용한다.
    var btAllTimer;

    // btAll 이라는 곳에 마우스를 영역에 걸치면
    // catAllWrap 을 보여준다.
    btAll.mouseenter(function () {
        // 일정한 시간 뒤에 사라지는 타이머를 제거한다.
        clearTimeout(btAllTimer);
        // display: block 설정
        // catAllWrap.show();
        catAllWrap.addClass("cate-all-wrap-visible");
    });
    // btAll 에서 마우스가 빠져나가면
    // catAllWrap 을 안보이게 하겠다.
    btAll.mouseleave(function () {
        // display: none 설정
        // catAllWrap.hide();
        // 마우스가 아웃을 했을 때
        // 즉시 display: none을 주지 않는다.
        // 조금 시간을 준다.
        // 일정 시간이 지나면 
        // 그때 display:none 이 된다.
        // btAllTimer 를 만들고 
        btAllTimer = setTimeout(function () {
            // catAllWrap.hide();
            catAllWrap.removeClass("cate-all-wrap-visible");
        }, 200);
    });

    catAllWrap.mouseenter(function () {
        // 사라지기로 한 기능을 실행하지 않도록 처리
        // 타이머를 지운다.
        clearInterval(btAllTimer);
    });
    catAllWrap.mouseleave(function () {
        // 카테고리 영역이 display:none 이된다.
        // catAllWrap.hide();
        // btAllTimer 타이머를 하나 만들어서 
        // display:none 을 Delay 를 준다.
        btAllTimer = setTimeout(function () {
            catAllWrap.removeClass("cate-all-wrap-visible");
        }, 200);
    })


    //레시피 계산기
    //정보 div 먼저 찾기
    let recipeGood = $(".recipe-good");
    //전체 출력 개수
    let recipeCount = recipeGood.length;
    //전체 개수 출력자리
    let recipeTotalTag = $(".recipe-good-total-count em");
    // 전체 총 금액 출력자리
    let recipeTotalPriceTag = $(".recipe-cart-bt em");
    //금액 출력 태그
    let recipeGoodPrice = $('.recipe-good-price b');
    //금액만 별도로 뽑아서 관리하는 묶음 (Array)
    //숫자들을 만들어서 index에 배치한다.
    var recipePriceArr = [];
    $.each(recipeGoodPrice, function (index, item) {
        var price = $(this).html();
        //글자를 숫자로 변환하는 작업 필요
        //"3,300" -> 3300숫자로 변환
        //, 모두 제거하는 기능
        // 정규표현식은 문자열을 쉽게 변형
        price = price.replace(/\,/g, "");

        //글자를 숫자로 변형시킨다.
        //parseInt : 글자를 정수로 바꾼다
        price = parseInt();

        recipePriceArr[index] = price;
    })


    //목록 체크박스 클릭 처리 
    var goodCheck = $(".recipe-good-label");
    $.each(goodCheck, function (index, item) {

        //자동으로 체크되어 있어야 한다.
        $(this).addClass("recipe-good-label-active");

        $(this).click(function () {
            $(this).toggleClass("recipe-good-label-active");
            showPriceTotal();
        })
    });

    // 전체 레시피 체크 박스
    var goodCheckAll = $(".recipe-good-total-label");
    goodCheckAll.addClass("recipe-good-total-label-active");
    goodCheckAll.click(function () {
        if (goodCheckAll.hasClass("recipe-good-total-label-active")) {
            // 목록 전체 선택 해제
            goodCheck.removeClass("recipe-good-label-active");
        } else {
            // 목록 전체 선택 적용
            goodCheck.addClass("recipe-good-label-active");
        }
        goodCheckAll.toggleClass("recipe-good-total-label-active");

        showPriceTotal();
    });

    //  출력하기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 금액 출력 기능
    function showPriceTotal() {
        // 전체 선택 개수 count
        var count = 0;
        // 전체 선택 금액 money
        var money = 0;

        $.each(goodCheck, function (index, item) {
            // hasClass("이름") 클래스 가지고 있는지 파악
            // 있으면 true  없으면 false
            if ($(this).hasClass("recipe-good-label-active")) {
                // 선택된 개수를 증가
                count += 1;
                // 선택된 상품의 가격을 증가
                // recipePriceArr = [3300, 3300, 3300, 3300, 3300]
                money += recipePriceArr[index];
            }
        });

        // 전체 개수 출력 실행
        recipeTotalTag.html(count);
        // 전체 금액 출력 실행
        recipeTotalPriceTag.html(money);
        recipeTotalPriceTag.html(money);

        // 선택된 개수를 출력시키고 난 후에 전체 개수 보다 적으면
        // 전체 체크박스 해제 
        if (count < recipeCount) {
            goodCheckAll.removeClass("recipe-good-total-label-active");
        } else {
            goodCheckAll.addClass("recipe-good-total-label-active");
        }
    }
    showPriceTotal();

    // 상단 스크롤 처리
    var scY = $(window).scrollTop();
    var header = $(".header");
    var visual = $(".visual");
    $(window).scroll(function () {
        // 스크롤바의 이동 픽셀
        scY = $(window).scrollTop();
        if (scY >= 80) {
            header.addClass("header-active")
            visual.addClass("visual-active")
        } else {
            header.removeClass("header-active")
            visual.removeClass("visual-active")
        }
    });
    // 조합원센터 토글 메뉴
    var centerMore = $('#center-more');
    var centerMoreList = $('.center-more-list');
    centerMore.click(function (e) {
        // 클릭된 이벤트가  body 까지 전달되는 것 막기
        e.stopPropagation();
        // href 기능을 막는다.
        e.preventDefault();
        centerMore.toggleClass("center-more-active")
        centerMoreList.toggleClass("center-more-list-active");
        // 나머지 닫는다.
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
        eventList.removeClass("event-list-active")
        iconArrow.removeClass("icon-arrow-active");
    });

    // 주메뉴 더보기 기능
    var gnbMore = $(".gnb-more")
    var gnbMoreList = $(".gnb-more-list");
    gnbMore.click(function (e) {
        // 절대로 아래 즉, body 로 클릭을 전달하면 안된다.
        e.stopPropagation();
        // 클래스를 추가했다가 제거하는 동작 반복
        // toggleClass("클래스 단어만 작성")
        gnbMoreList.toggleClass("gnb-more-list-active");
        gnbMore.toggleClass("gnb-more-active");

        // 먼저 글자를 읽는다.
        var tt = gnbMore.find(">span").html();
        // 비교한다.
        if (tt === "더보기") {
            gnbMore.find(">span").html("접기");
        } else {
            gnbMore.find(">span").html("더보기");
        }
        // 나머지 모두닫는다.
        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        eventList.removeClass("event-list-active")
        iconArrow.removeClass("icon-arrow-active");
    });

    // 이벤트 더보기 관련
    var iconArrow = $(".icon-arrow");
    var eventList = $(".event-list");
    iconArrow.click(function (e) {
        // a 태그의 href 막아야 함.
        // 웹브라우저 갱신 막는다.
        e.preventDefault();
        // body 클릭이 전달되는 것을 막는다.
        e.stopPropagation();
        iconArrow.toggleClass("icon-arrow-active");
        eventList.toggleClass("event-list-active");
        // 나머지 닫는다.
        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
    });

    // 모든 펼침메뉴 닫기
    $('body').click(function () {
        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
        eventList.removeClass("event-list-active")
        iconArrow.removeClass("icon-arrow-active");
    });

    // family 기능 관련
    var footerHelp = $(".footer-help");
    var family = $(".family");
    footerHelp.click(function (e) {
        // a 태그이므로 웹브라우저 갱신 막기
        e.preventDefault();
        // 클릭 전달을 막는다.
        e.stopPropagation();
        family.toggleClass("family-active")
    })
    $('body').click(function () {
        family.removeClass("family-active")
    })

    //위로 부드럽게 이동하기
    let goTop = $('.goTop');
    goTop.click(function (e) {
        //a 태그라서 막아준다.
        e.preventDefault();
        //js에서는 1000이 1초임
        $('html').stop().animate({
            screenTop: 0
        }, 1000);
    })

    // 이 물품 어떠세요?
    // 첫번째 줄 데이터
    var purposeData_1;
    purposeData_1 = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "알뜰",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "",
            link: "#"
        }
    ];
    // 내용이 배치되는 장소 선택
    var purposeDiv_1;
    // 아래 구문에서 eq 를 이용해서 index 로 찾는다.
    purposeDiv_1 = $(".purpose .good-list-wrap").eq(0);
    // 데이터를 배치한다.
    // : html 글자를 먼저 완성한다.

    var purposeHtml_1 = "";
    // 데이터 개수 만큼 for 루틴을 실행한다.
    for (var i = 0; i < purposeData_1.length; i++) {
        purposeHtml_1 += ` <div class="good-box good-box-mr">
    <a href="${purposeData_1[i].link}" class="good-img">
        <img src="images/${purposeData_1[i].pic}" alt="${purposeData_1[i].title}">`;

        //옵션이 있을수도 있고 없을 수도 있다.
        if (purposeData_1[i].opt !== "") {
            purposeHtml_1 += `<span class="good-event" style="${ (purposeData_1[i].opt === "알뜰") ? "background:red;" : "" }">
            <em>${purposeData_1[i].opt}</em>
        </span>`;
        }

        purposeHtml_1 += `</a>
    <a href="#" class="good-info">
        <span>${purposeData_1[i].title}<em>(${purposeData_1[i].unit})</em></span>
    </a>
    <a href="#" class="good-price">
        <span>${purposeData_1[i].price}&nbsp;<em>원</em></span>
    </a>
    <a href="#" class="good-cart">
        장바구니 담기
    </a>
</div>`
    }

    // : purposeDiv_1.html(html 글자) 를 실행하여 완료한다.
    purposeDiv_1.html(purposeHtml_1);
    // jquery 를 이용해서 css 클래스 제거하기
    // .good-box-rm 클래스 중에 마지막 것은 제거한다.
    // removeClass(클래스단어)
    // $(".purpose .good-list-wrap").eq(0) === purposeDiv_1
    var purposeDiv_1_good_box = $(".purpose .good-list-wrap").eq(0).find(".good-box");
    var purposeDiv_1_good_box = purposeDiv_1.find(".good-box");
    purposeDiv_1_good_box.eq(3).removeClass("good-box-mr");

    var purposeData_2;
    purposeData_2 = [{
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }
    ];
    var purposeDiv_2;
    purposeDiv_2 = $('.purpose .good-list-wrap').eq(1);
    var purposeHtml_2 = "";
    for (var i = 0; i < purposeData_2.length; i++) {
        purposeHtml_2 += ` <div class="good-box good-box-mr">
    <a href="${purposeData_2[i].link}" class="good-img">
        <img src="images/${purposeData_2[i].pic}" alt="${purposeData_2[i].title}">
        <span class="good-event">
            <em>${purposeData_2[i].opt}</em>
        </span>
    </a>
    <a href="#" class="good-info">
        <span>${purposeData_2[i].title}<em>(${purposeData_2[i].unit})</em></span>
    </a>
    <a href="#" class="good-price">
        <span>${purposeData_2[i].price}&nbsp;<em>원</em></span>
    </a>
    <a href="#" class="good-cart">
        장바구니 담기
    </a>
</div>`
    }
    purposeDiv_2.html(purposeHtml_2);
    var purposeDiv_2_good_box = purposeDiv_2.find('.good-box');
    purposeDiv_2_good_box.eq(3).removeClass("good-box-mr");

    // 알뜰 상품 관련
    var saleData = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];

    // 알뜰 상품 슬라이드가 배치될 장소
    var saleDiv = $('.sw-sale .swiper-wrapper');
    // 내용을 배치할 html 글자 생성
    var saleHtml = "";
    for (var i = 0; i < saleData.length; i++) {
        saleHtml += `<div class="swiper-slide">
    <!-- 슬라이드 내용 -->
    <div class="good-box">
        <a href="${saleData[i].link}" class="good-img">
            <img src="images/${saleData[i].pic}" alt="${saleData[i].title}">
            <span class="good-event">
                <em>${saleData[i].opt}</em>
            </span>
        </a>
        <a href="#" class="good-info">
            <span>${saleData[i].title}<em>(${saleData[i].unit})</em></span>
        </a>
        <a href="#" class="good-price">
            <span>${saleData[i].price}&nbsp;<em>원</em></span>
        </a>
        <a href="#" class="good-cart">
            장바구니 담기
        </a>
    </div>
    <!--// 슬라이드 내용 -->
</div>
    `
    }

    saleDiv.html(saleHtml);

    // 추천 물품 관련
    var choiceData = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];

    var choiceDiv = $(".sw-choice .swiper-wrapper");

    var choiceHtml = "";
    for (var i = 0; i < choiceData.length; i++) {
        choiceHtml += `<div class="swiper-slide">
    <!-- 슬라이드 내용 -->
    <div class="good-box">
        <a href="${choiceData[i].link}" class="good-img">
            <img src="images/${choiceData[i].pic}" alt="${choiceData[i].title}">
            <span class="good-event">
                <em>${choiceData[i].opt}</em>
            </span>
        </a>
        <a href="#" class="good-info">
            <span>${choiceData[i].title}<em>(${choiceData[i].unit})</em></span>
        </a>
        <a href="#" class="good-price">
            <span>${choiceData[i].price}&nbsp;<em>원</em></span>
        </a>
        <a href="#" class="good-cart">
            장바구니 담기
        </a>
    </div>
    <!--// 슬라이드 내용 -->
</div>
    `
    }
    choiceDiv.html(choiceHtml);

    // 인기물품 데이터
    var popularData_1 = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }

    ];
    var popularData_2 = [{
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_3 = [{
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },

        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },

        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_4 = [{
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_5 = [{
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_6 = [{
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_7 = [{
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_8 = [{
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_9 = [{
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_10 = [{
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_11 = [{
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_12 = [

        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_13 = [{
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_14 = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];

    // 인기 상품에 출력할 데이터 html
    var popularHtml = "";
    // 인기 상품이 출력될 장소
    var popularDiv = $(".popular .good-list-wrap");
    // 여러번 데이터가 다를 때 마다 실행되므로 함수로 만들어야 한다.
    function popularChange(_data) {

        // html 내용을 새롭게 만들어 주어야 한다.
        popularHtml = "";

        for (var i = 0; i < _data.length; i++) {
            popularHtml += `<div class="good-box good-box-mr">
    <a href="${_data[0].link}" class="good-img">
        <img src="./images/${_data[0].pic}" alt="${_data[0].title}">
        <span class="good-event"><em>${_data[0].opt}</em></span>
    </a>
    <a href="#" class="good-info">
        <span>
        ${_data[0].title}<em>(${_data[0].unit})</em>
        </span>
    </a>
    <a href="#" class="good-price">
        <span>
        ${_data[0].price}&nbsp;<em>원</em>
        </span>
    </a>
    <a href="#" class="good-cart">
        장바구니
    </a>
</div>`
        }
        popularDiv.html(popularHtml);
        popularDiv.find('.good-box').eq(3).removeClass("good-box-mr");
    }
    // 인기 상품 리스트 클릭시 데이터 변경 실행
    // 버튼들을 찾아서 저장한다.
    var popularBts = $(".sw-cate a");

    // 현재 코드는 click 을 처리할 수 있다.
    // 그리고, href 의 기능도 막을 수있다.
    // 하지만, a 태그 14개 중 몇번째가 클릭되었는지
    // 알수가 없다.
    // 몇번째가 클릭이 되었는지 알아야 
    // 관련된 데이터를 보여줄 수 있다.
    // 내일은 다시 클릭에 대해서 새로운 방식으로 접근한다.
    // 클릭된 번호를 알 수 있도록 고친다.

    popularChange(popularData_1);

    popularBts.click(function (event) {
        // a 태그를 클릭하면 클릭된 신호(event) 웹브라우저로
        // 전달이 된다. 이를 event 라고 한다.    
        // a 태그의  href 를 막는다.
        // 웹브라우저 갱신이 안된다.
        event.preventDefault();

        console.log("click");
    });

    // 각각(each)의 버튼을 클릭을 하면
    // 몇번째 버튼이 클릭이 되었는지
    // 순서를 파악할 수 있다.
    // $.each(); 주 목적은 순서 번호(index)를 파악
    // $.each(선택대상)
    // $.each(선택대상, function(){ })
    // $.each(선택대상, function(index){ })

    // $.each( $(".sw-cate a")  )

    // 카테고리 선택시 출력될 장소 선택
    var popularBtn = $(".popular .btn");
    var popularDataArr = [
        popularData_1,
        popularData_2,
        popularData_3,
        popularData_4,
        popularData_5,
        popularData_6,
        popularData_7,
        popularData_8,
        popularData_9,
        popularData_10,
        popularData_11,
        popularData_12,
        popularData_13,
        popularData_14,
    ];

    $.each(popularBts, function (index, item) {

        // console.log(index, item, cate );
        $(this).click(function (event) {
            // 웹 브라우저가 클릭된 event 를 막아주어서
            // 웹 브라우저의 갱신을 막는다.
            // a 태그의 href 를 처리하지 않는다.
            event.preventDefault();
            // 카테고리 버튼에 글자를 출력하고 싶다.
            // $(".popular .btn").html(새로운 글자로 );
            var cate = $(this).find(".cate-name").html();
            popularBtn.html(cate);

            // 목록 갱신
            console.log("선택된 순서 ", index);
            popularChange(popularDataArr[index]);

        });
    });

});

// 멀티미디어요소(영상, 이미지, 사운드 등) 가
// 모두 화면에 출력이 될 준비(다운로드)가 된다면 실행하라.
window.onload = function () {
    // 준비가 되면 실행 코드 작성
    //  슬라이드 스크립트 

    new Swiper('.sw-visual', {
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        speed: 500,
    });


    new Swiper('.sw-sale', {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 3,
    });
    new Swiper('.sw-choice', {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 3,
    });
    new Swiper('.sw-cate', {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 10,
        navigation: {
            prevEl: '.sw-cate-prev',
            nextEl: '.sw-cate-next'
        }
    });

    new Swiper('.sw-brand', {
        slidesPerView: 3,
        spaceBetween: 20
    });

    new Swiper('.sw-banner', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 0,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false
        }
    });

    new Swiper('.sw-review', {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 3,
    });
}