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

  getTemplate: function(text, name, login, uri, message) {
    var content = '';

        content += ' <div class="ls-list">';
        content += '   <header class="ls-list-header">';
        content += '     <div class="ls-list-image">';

        if (uri != null)
          content += '          <img class="img-circle" src="' + uri + '">';

        content += '     </div>';
        content += '     <div class="ls-list-title">';
        content += '       <h3>' + name + ' <a href="https://twitter.com/' + login + '" target="_blank">(' + login + ')</a> </h3>';
        content += '       <span aria-hidden="true" class="ico-' + message.type + '"></span>';
        content += '     </div>';
        content += '   </header>';
        content += '   <div class="ls-list-title">';
        content += '     <blockquote>';
        content += '       <p class="text-success">' + text + '</p>';
        content += '     </blockquote>';
        content += '   </div>';
        content += ' </div>';

    return content;
  },

  append: function(message) {
    var tag = good_news.getTemplate(message.text, message.user.name, message.user.login, message.user.uri, message);
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
