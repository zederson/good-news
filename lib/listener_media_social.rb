class ListenerMediaSocial

  def start(words)
    storage = ::Storage::Message.instance

    client.listener({words: words}) do |message|
      storage.add_message(ActiveSupport::JSON.encode(message))
    end
  end

  def client
    MediaSocial::TwitterClient.new
  end
end
