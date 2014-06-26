var tags = {
  input:"",
  tager:"",

  init: function(){
  },

  setup: function(input, target, btn) {
    this.input  = input;
    this.target = target;
    $(btn).on( "click", this.click);

    $(input).keypress(function(e) { if(e.which == 13) {
                                      $(btn).trigger('click');
                                    }
                      });
  },

  click: function() {
    var _val = $(tags.input).val();
    if (!_val)
      return;

    tags.createHidden(_val);
    $(tags.target).append(tags.template(_val));
    $('.dropdown-toggle').dropdown();
    $(tags.input).val('');
    $(tags.input).focus();
  },

  createHidden: function(text) {
    var index   = $(tags.target).find('.dropdown').size();
    index++;
    var element = '<input type="hidden" name="tag_name[]" value="' + text + '" id="tag_hidden_'+ index + '" /> ';
    $('form').append(element);
  },

  template: function(text) {
    var t     = "";
    var index = $(tags.target).find('.btn-group').size();
    index++;

    t += '<li id="tag_item_' + index + '" >';
    t += '  <div class="btn-group" >';
    t += '    <a class="btn btn-danger ico-tag" href="javascript:;">' + text + '</a>';
    t += '    <a class="btn btn-danger dropdown-toggle" data-toggle="dropdown" href="#"></a>';
    t += '    <ul class="dropdown-menu">';
    t += '      <li><a href="javascript:;" onclick="tags.remove('+ index + ')" ><i class="icon-pencil"></i>Excluir</a></li>';
    t += '    </ul>';
    t += '  </div>';
    t += '</li>';

    return $(t);
  },

  remove: function(index) {
    var obj = $(tags.target + ' #tag_item_' + index);
    obj.hide('slow', function(){ obj.remove(); });
  },

  start_listener: function(){
    var tags = [];
    $('.tags').each(function( index ) { tags.push($( this ).text()) });

    $.ajax({
           type:'GET',
           url: '/tags/listener',
           data: $.param({ tag_name: tags})
    });
  }
}
