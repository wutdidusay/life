// ios touch event support
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

$(function(){
  // aside navigation menu
  $('.mark, .dim').click(function(){
      if($('nav').is('.active')){
        $('nav, .dim').removeClass('active');
      } else {
        $('nav, .dim').addClass('active');
      }
  });
    
  function pathMenu(){
    var windowPath = window.location.pathname.split("/").pop()
    for(i=0; i<$('nav li').length; i++){
        var pathHref = $('nav li').eq(i).find('a').attr('href')
        if(windowPath == pathHref){
          $('nav li').removeClass()
          $('nav li').eq(i).addClass('active')
        }
    }
  } pathMenu()

  var menu = []
  var overlap = false;

  function addMenu(){
    var val = $('input').val();
    var overlap = false;

    if(val == ''){
      overflap = true;
    } else {
      for(i=0; i<menu.length; i++){
        if( val == menu[i] ){
            alert('같은 메뉴자나 바보야') 
            $('input').val('');
            return true
        }
      }

      if( overlap !== true ){
          menu.push(val);
          $('.menu ul').append('<li>' + val + '<i class="del fas fa-minus-circle"></i>' + '</li>');
          $('input').val('');
      }
    }
    console.log(overlap)
    console.log(menu)
  }

  function result(){
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
  // add menu
  $('.add-menu').click(function(){
    addMenu()
  })
  $('input').keydown(function (key) {
    if (key.keyCode == 13) {
        addMenu()
    }
  })

  // all clear
  $('h1').click(function(){
    menu = []
    $('.menu ul li').remove()
  })

  // list clear
  $('.menu ul').on('click', '.del', function(){
    var idx = $(this).parent().index()
    menu.splice(idx, 1);
    $(this).parent().addClass('remove')
    setTimeout(() => {
      $(this).parent().remove()
      }, 200);
    console.log(menu)
  })
    
  // show result
  $('.result').click(function(){
    result()
  })

  // scroll to top
  $('.to-top').click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  })

  // top button show
  $(window).scroll(function(){
    var sct = $(this).scrollTop();
    var scb = sct + $(this).height();
    var scw = $(document).height();

    if(scb >= scw){
      $('.to-top').addClass('active');
    }else{
      $('.to-top').removeClass('active');
    }
  })
})