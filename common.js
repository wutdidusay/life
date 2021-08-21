// ios touch event support
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

// aside navigation menu
$(function(){
    $('.mark, .dim').click(function(){
        if($('nav').is('.active')){
          $('nav, .dim').removeClass('active');
        } else {
          $('nav, .dim').addClass('active');
        }
    });
    
    function pathMenu(){
    var windowPath = window.location.pathname.split("/").pop()
    var pathMenu = []
    $('nav li').removeClass()

        for(i=0; i<$('nav li').length; i++){
            var pathHref = $('nav li').eq(i).find('a').attr('href')
            if(windowPath == pathHref){
            $('nav li').eq(i).addClass('active')
            }
        }
    } pathMenu()
})