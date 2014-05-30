module MediaSocial
  class User
    attr_accessor :login, :name, :uri

    def initialize(attrs = {})
      params             = attrs.with_indifferent_access
      @login             = params[:login]
      @name              = params[:name]
      @uri               = params[:uri]
    end

    def self.from_json(json)
      return nil if json.blank?
      hash = ActiveSupport::JSON.decode(json)
      MediaSocial::User.new({ login: hash["login"], name: hash["name"], uri: hash["uri"] })
    end
  end
end
