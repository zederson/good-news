require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

def log_info(message)
  Rails.logger.info message
  true
end

def log_error(message)
  Rails.logger.error message
  true
end

module GoodNews
  extend self
  attr_accessor :settings

  self.settings    = YAML.load_file('config/good-news.yml')

  def redis
    @@redis ||= begin
      conf = GoodNews.settings['redis'].symbolize_keys
      Rails.logger.info "Connect Redis: #{conf}"
      Redis.new conf
    end
  end

  class Application < Rails::Application
    config.autoload_paths += %W(#{config.root}/lib)
    config.encoding = "utf-8"
    config.i18n.default_locale = :pt
    config.time_zone = 'Brasilia'
  end
end
