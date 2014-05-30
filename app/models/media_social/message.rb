module MediaSocial
  class Message

    attr_accessor :user, :text

    def initialize(user, text)
      @user = user
      @text = text
    end

    def self.from_json(json)
      return nil if json.blank?

      hash = ActiveSupport::JSON.decode(json)
      user = MediaSocial::User.new(hash["user"])
      MediaSocial::Message.new(user, hash["text"])
    end
  end
end
