class MessagesController < WebsocketRails::BaseController

  def get_messages
    log_info "start get messages"

      # i = 0
      # EventMachine.run {
      #   EventMachine.add_periodic_timer(5) {
      #     i = i+1
      #     send_message :message_success, MediaSocial::Message.new(MediaSocial::User.new({name: "Ederson de Lima - #{i} ", login: "zederson - #{i}", uri: 'https://pbs.twimg.com/profile_images/1587377966/image_normal.jpg'}), "Olha o teste ai #{i} #{' asdasd '*50} "), :namespace => :good_news
      #   }
      # }


      messages = Storage::Message.new
      messages.on_message do | message |
        puts message.inspect
        send_message :message_success, build_message(message), :namespace => :good_news if message
      end
  end

  def build_message(json)
    MediaSocial::Message.from_json(json)
  end
end
