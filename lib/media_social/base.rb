module MediaSocial
  class Base

    attr_accessor :options

    def initialize(options = {})
      @options = options
      login
    end

    def login
    end

    def listener(params = {})
    end

    def build_message(params ={})
    end

    def conf
      @@config ||= GoodNews.settings["twitter"]
    end
  end
end
