// ios touch event support
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

$(function () {
  // noticeMsg = "지도 공사가 끝났습니다.";
  // $('body').prepend('<p class="notice">' + noticeMsg + '</p>');
  navList = [
    {
      'name': '랜덤선택',
      'link': 'index'
    },
    {
      'name': '근처에서 먹어',
      'link': 'map-api'
    },
    {
      'name': '이거 먹어',
      'link': 'eat-this'
    },
    {
      'name': '술 마셔',
      'link': 'drink'
    },
    {
      'name': '로또 추첨',
      'link': 'lotto'
    },
    {
      'name': '연금복권 추첨',
      'link': 'pension'
    }
  ];

  function navMenu() {
    for (i = 0; i < navList.length; i++) {
      $('nav ul').append('<li>' + '<a href="' + navList[i].link + '.html' + '">' + navList[i].name + '</a>' + '</li>');
    }
  } navMenu()

  function pathMenu() {
    var windowPath = window.location.pathname.split("/").pop()
    console.log(window.location.pathname)
    if (window.location.pathname == '/life/') {
      $('nav li').eq(0).addClass('active')
    }
    for (i = 0; i < $('nav li').length; i++) {
      var pathHref = $('nav li').eq(i).find('a').attr('href')
      if (windowPath == pathHref) {
        $('nav li').removeClass()
        $('nav li').eq(i).addClass('active')
        document.title = navList[i].name
        $('h1').text(navList[i].name)
        if (i == 0) {
          $('h1').text(navList[i].name).append('<i class="fas fa-sync-alt"></i>');
        }
        if (i == 2 || i == 3) {
          $('h1').text(navList[i].name).append('<i class="fas fa-book"></i>');
        }
      }
    }
  } pathMenu()

  function addMenu() {
    var val = $('input').val().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");;
    var overlap = false;

    if (val == '') {
      overflap = true;
    } else {
      for (i = 0; i < menu.length; i++) {
        if (val == menu[i]) {
          alert('같은 메뉴자나 바보야')
          $('input').val('');
          return true
        }
      }

      if (overlap !== true) {
        menu.push(val);
        $('.menu ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
        $('input').val('');
      }
    }
    console.log(overlap)
    console.log(menu)
  }

  function result() {
    var ranNumb = Math.floor(Math.random() * menu.length)
    console.log(ranNumb)
    var eatThis = []
    var elTop = $('.menu ul li').eq(ranNumb).offset().top
    var halfPos = $(window).height() / 2 - 45

    $('html, body').animate({
      scrollTop: elTop - halfPos
    }, 500)

    eatThis.push(menu[ranNumb])
    // menu.splice(ranNumb, 1) 당첨된 메뉴 제거
    $('.menu ul li').removeClass('active')
    $('.menu ul li').eq(ranNumb).addClass('active')
    // alert(eatThis)
  }

  // eat this page menu load
  var menu = []
  var eatThis = $.getJSON("./menuList.json", function (data) {
    var winPath = window.location.pathname.split("/").pop().split('.').shift()
    if (winPath == 'eat-this') {
      for (i = 0; i < eatThis.responseJSON.length; i++) {
        for (j = 0; j < eatThis.responseJSON[i].list.length; j++) {
          var val = eatThis.responseJSON[i].list[j]
          menu.push(val)
          $('.eat-this-wrap ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
          $('.update-wrap ul').append('<li>' + val + '</li>');
        }
      }
    }
    return data
  });

  $('.eat-this .input-wrap li').on('click', function () {
    $('.input-wrap li').removeClass('active');
    $(this).addClass('active');
    menu = []
    $('.menu ul li').remove()

    if (this.id == 'All') {
      for (i = 0; i < eatThis.responseJSON.length; i++) {
        for (j = 0; j < eatThis.responseJSON[i].list.length; j++) {
          var val = eatThis.responseJSON[i].list[j]
          menu.push(val)
          $('.menu ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
        }
      }
    }

    for (i = 0; i < eatThis.responseJSON.length; i++) {
      if (this.id == eatThis.responseJSON[i].food) {
        pick = i;
        for (j = 0; j < eatThis.responseJSON[pick].list.length; j++) {
          var val = eatThis.responseJSON[pick].list[j]
          menu.push(val)
          $('.menu ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
        }
      }
    }
    console.log(menu)
  });

  // drink page menu load
  var menu = []
  var drinkMenu = $.getJSON("./drinkList.json", function (data) {
    var winPath = window.location.pathname.split("/").pop().split('.').shift()
    if (winPath == 'drink') {
      for (i = 0; i < drinkMenu.responseJSON.length; i++) {
        for (j = 0; j < drinkMenu.responseJSON[i].list.length; j++) {
          var val = drinkMenu.responseJSON[i].list[j]
          menu.push(val)
        }
      }
      var dupMenu = [...new Set(menu)]
      menu = dupMenu

      for (i = 0; i < menu.length; i++) {
        $('.drink-wrap ul').append('<li>' + menu[i] + '<i class="del fas fa-minus-circle"></i>' + '</li>');
        $('.update-drink-wrap ul').append('<li>' + menu[i] + '</li>');
      }
    }
    return data
  });

  $('.drink .input-wrap li').on('click', function () {
    $('.input-wrap li').removeClass('active');
    $(this).addClass('active');
    menu = []
    $('.menu ul li').remove()

    if (this.id == 'All') {
      for (i = 0; i < drinkMenu.responseJSON.length; i++) {
        for (j = 0; j < drinkMenu.responseJSON[i].list.length; j++) {
          var val = drinkMenu.responseJSON[i].list[j]
          menu.push(val)
        }
      }
      var dupMenu = [...new Set(menu)]
      menu = dupMenu

      for (i = 0; i < menu.length; i++) {
        $('.menu ul').append('<li>' + menu[i] + '<i class="del fas fa-minus-circle"></i>' + '</li>');
      }
    }

    for (i = 0; i < drinkMenu.responseJSON.length; i++) {
      if (this.id == drinkMenu.responseJSON[i].food) {
        pick = i;
        for (j = 0; j < drinkMenu.responseJSON[pick].list.length; j++) {
          var val = drinkMenu.responseJSON[pick].list[j]
          menu.push(val)
          $('.menu ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
        }
      }
    }
    console.log(menu)
  });

  // add menu
  $('.add-menu').click(function () {
    addMenu()
  })
  $('input').keydown(function (key) {
    if (key.keyCode == 13) {
      addMenu()
    }
  })

  // aside navigation menu
  $('.mark').click(function () {
    $('.modal').removeClass('active');
    if ($('nav').is('.active')) {
      $('nav, .dim').removeClass('active');
    } else {
      $('nav, .dim').addClass('active');
      $('body').addClass('noscroll')
    }
  });

  // menu list modal
  $('.update-modal').click(function () {
    if ($('.modal').is('.active')) {
      $('.modal, .dim').removeClass('active');
    } else {
      $('.modal, .dim').addClass('active');
      $('body').addClass('noscroll')
    }
  });

  // click dim close all
  $('.dim').click(function () {
    $('nav, .modal, .dim').removeClass('active');
    $('body').removeClass('noscroll')
  });

  // all clear
  $('.clear').click(function () {
    menu = []
    $('.menu ul li').remove()
  })

  // list clear
  $('.menu ul').on('click', '.del', function () {
    var idx = $(this).parent().index()
    menu.splice(idx, 1);
    $(this).parent().addClass('remove')
    setTimeout(() => {
      $(this).parent().remove()
    }, 200);
    console.log(menu)
  })

  // show result
  $('.result').on('click', function () {
    console.log(menu)
    result()
    var el = document.querySelector(".menu li.active")
    setTimeout(() => {
      party.confetti(el, {
        count: party.variation.range(50, 50),
        size: party.variation.range(1, 1.5)
      });
    }, 400);
  })

  // scroll to top
  $('.to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  })

  // top button show
  $(window).scroll(function () {
    var sct = $(this).scrollTop();
    // var scb = sct + $(this).height();
    // var scw = $(document).height();

    // if(scb >= scw){
    if (sct >= 100) {
      $('.to-top').addClass('active');
    } else {
      $('.to-top').removeClass('active');
    }
  })
})
