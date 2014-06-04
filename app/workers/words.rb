class Words
  @queue = :word

  def self.perform(word)
    puts ">>>>> #{word}"
    log_info ">>>>> #{word}"

  end

end
