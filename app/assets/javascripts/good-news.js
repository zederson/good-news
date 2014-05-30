var countMessages = 0;
var totalMessages = 0;
var MAX_MESSAGES  = 5;

var good_news = {
  init: function(){
    good_news.start();
  },

  start: function() {
    var url        = this.getObj().data('uri');
    var dispatcher = new WebSocketRails(url);

    dispatcher.trigger('good_news.get_messages');
    dispatcher.bind('good_news.message_success', function(message) {
      good_news.append(message);
    });
  },

  getObj: function() {
    return $("#content-messages");
  },

  getTemplate: function(text, name, login, uri) {
    var content = '';
        content += '<div id="content">  <div class="row">';
        content += '    <div class="container-fluid">';
        content += '      <div class="row-fluid">';
        content += '        <div class="span1">';

        if (uri != null)
          content += '          <img class="img-circle" src="' + uri + '">';

        content += '        </div>';
        content += '        <div class="span11">';
        content += '            <div class="span11">';
        content += '              <h5>' + name + ' (' + login + ')</h5>';
        content += '              <blockquote><p class="text-success">' + text + '<p></blockquote>';
        content += '            </div>';
        content += '        </div>';
        content += '      </div>';
        content += '    </div>';
        content += '  </div>';
        content += '  <hr /> </div>';
    return content;
  },

  append: function(message) {
    var tag = good_news.getTemplate(message.text, message.user.name, message.user.login, message.user.uri);
    //this.getObj().find('.text-animate').prepend(tag);

    $(tag).prependTo(this.getObj().find('.text-animate'))
          .hide().css('opacity', 0)
          .slideDown(1500)
          .animate(
            { opacity: 1 },
            { queue: false, duration: 'slow' }
          );

    countMessages++;
    totalMessages++;
  },

  remove: function() {
    if(countMessages < MAX_MESSAGES)
      return;

    good_news.getObj().find('.text-animate p').each(function(i, value) {
      if (i > MAX_MESSAGES)
        return;

      $(this).removeClass();
      $(this).addClass('animated ' + animate.out());
      $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        $( this ).fadeOut(1000, function() {
          $( this ).remove();
        })
      );
      countMessages--;
    });
  }
}


var animate = {

  in: function() {
    var values = [
    "bounce"            ,
    "flash"             ,
    "pulse"             ,
    "rubberBand"        ,
    "shake"             ,
    "swing"             ,
    "tada"              ,
    "wobble"            ,
    "bounceIn"          ,
    "bounceInDown"      ,
    "bounceInLeft"      ,
    "bounceInRight"     ,
    "bounceInUp"        ,
    "fadeIn"            ,
    "fadeInDown"        ,
    "fadeInDownBig"     ,
    "fadeInLeft"        ,
    "fadeInLeftBig"     ,
    "fadeInRight"       ,
    "fadeInRightBig"    ,
    "fadeInUp"          ,
    "fadeInUpBig"       ,
    "flip"              ,
    "flipInX"           ,
    "flipInY"           ,
    "lightspeedIn"      ,
    "rotateIn"          ,
    "rotateInDownLeft"  ,
    "rotateInDownRight" ,
    "rotateInUpLeft"    ,
    "rotateInUpRight"   ,
    "slideInDown"       ,
    "slideInLeft"       ,
    "slideInRight"      ,
    "slideInUp"         ,
    "rollIn"            ,
    "zoomIn"            ,
    "zoomInDown"        ,
    "zoomInLeft"        ,
    "zoomInRight"       ,
    "zoomInUp"
    ];

    return values[Math.floor(Math.random() * values.length)];
  },

  out: function() {
    var values = [
    "flipOutX",
    "flipOutY",
    "bounceOut"         ,
    "bounceOutDown"     ,
    "bounceOutLeft"     ,
    "bounceOutRight"    ,
    "bounceOutUp"       ,
    "fadeOut"           ,
    "fadeOutDown"       ,
    "fadeOutDownBig"    ,
    "fadeOutLeft"       ,
    "fadeOutLeftBig"    ,
    "fadeOutRight"      ,
    "fadeOutRightBig"   ,
    "fadeOutUp"         ,
    "fadeOutUpBig",
    "lightspeedOut",
    "rotateOut"         ,
    "rotateOutDownLeft" ,
    "rotateOutDownRight",
    "rotateOutUpLeft"   ,
    "rotateOutUpRight",
    "slideOutDown",
    "slideOutLeft" ,     ,
    "slideOutRight"     ,
    "slideOutUp"        ,
    "rollOut",
    "hinge"             ,
    "zoomOut"           ,
    "zoomOutDown"       ,
    "zoomOutLeft"       ,
    "zoomOutRight"      ,
    "zoomOutUp"
    ];

    return values[Math.floor(Math.random() * values.length)];
  }
}
