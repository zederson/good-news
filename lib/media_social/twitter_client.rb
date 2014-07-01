module MediaSocial
  class TwitterClient < MediaSocial::Base

    def login
      configure_stream
      log_info "Login Twitter complete"
    end

    def configure_stream
      TweetStream.configure do |config|
        config.consumer_key        = conf["consumer_key"]
        config.consumer_secret     = conf["consumer_secret"]
        config.oauth_token         = conf["access_token"]
        config.oauth_token_secret  = conf["access_token_secret"]
        config.auth_method         = :oauth
      end
    end

    def client
      @client ||= TweetStream::Client.new
    end

    def listener(params = {})
      words = params[:words]
      log_info "track words: #{words}"

      client.track(words) do |status|
        log_info "===================    track    ==============="
        log_info "user: #{status.user.screen_name}"
        log_info "text: #{status.text}"

        yield build_message(status)
      end
    end

    def build_message(tweet)
      log_info "build message"

      user    = build_user(tweet)
      MediaSocial::Message.new(user, tweet.text, :twitter, tweet.id)
    end

    def build_user(tweet)
      opts = {login: tweet.user.screen_name, name: tweet.user.name}
      opts[:uri] = tweet.user.profile_image_url.to_s if tweet.user.profile_use_background_image?

      log_info "build user: #{opts}"
      MediaSocial::User.new(opts)
    end
  end
end
