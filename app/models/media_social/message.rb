module MediaSocial
  class Message

    attr_accessor :user, :text, :type, :message_id

    def initialize(user, text, type, message_id)
      @user       = user
      @text       = text
      @type       = type
      @message_id = message_id
    end

    def self.from_json(json)
      return nil if json.blank?

      hash = ActiveSupport::JSON.decode(json)
      user = MediaSocial::User.new(hash["user"])
      MediaSocial::Message.new(user, hash["text"], hash["type"].to_sym, hash["message_id"])
    end
  end
end
