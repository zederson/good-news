class Words
  @queue = :word

  def self.perform(word)
    Rails.logger = Logger.new(STDOUT)
    log_info "start work #{@queue} - with - #{word}"

    ListenerMediaSocial.new.start(word)

  end

end
