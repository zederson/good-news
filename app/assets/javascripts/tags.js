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
    var index = $(tags.target).find('.dropdown').size();
    index++;

    t += '<li class="active dropdown" id="tag_item_' + index + '">';
    t += '  <a class="dropdown-toggle" id="tag_' + index + '" role="button" data-toggle="dropdown" href="#"><i class="icon-tags"></i> #' + text + ' <i class="icon-remove"></i></a>';
    t += '  <ul id="menu_' + index + '" class="dropdown-menu" role="menu" aria-labelledby="tag_' + index + '">';
    t += '    <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:;" onclick="tags.remove('+ index + ')">Excluir</a></li>';
    t += '  </ul>';
    t += '</li>';

    return $(t);
  },

  remove: function(index) {
    var obj = $(tags.target + ' #tag_item_' + index);
    obj.hide('slow', function(){ obj.remove(); });
    $('#tag_hidden_' + index).remove();
  }

}
