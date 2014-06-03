class ListenerMediaSocial

  def start(words)
    storage = ::Storage::Message.new

    client.listener({words: words}) do |message|
      storage.add_message(ActiveSupport::JSON.encode(message))
    end
  end

  def client
    MediaSocial::TwitterClient.new
  end
end
