module Storage
  class Message

    attr_accessor :stop, :pause

    def initialize
      @stop  = false
      @pause = false
    end

    def stop?
      return true if @stop == true
      false
    end

    def pause?
      return true if @pause == true
      false
    end

    def on_message
      EventMachine.run {
        EventMachine.add_periodic_timer(time_loop) {
          EventMachine.stop if stop?
          yield first_message unless pause?
        }
      }
    end

    def first_message
      begin
        return nil unless redis.get key_counter_name
        execution = redis.multi do
          redis.lpop key_name
          redis.decr key_counter_name
        end
        execution[0]
      rescue => e
        Rails.logger.error "Erro when get first message to redis: #{e}"
        nil
      end
    end

    def add_message(message)
      begin
        redis.multi do
          redis.rpush key_name, message
          redis.incr key_counter_name
        end
        true
      rescue => e
        Rails.logger.error "Erro when add new message to redis: #{e}"
        false
      end
    end

    def key_counter_name
      'good_news::counter'
    end

    def key_name
      "good_news::messages"
    end

    def count
      count = redis.get key_counter_name
      count || 0
    end

    def time_loop
      GoodNews.settings['time_load_message'] || 5
    end

    def redis
      GoodNews.redis
    end
  end
end
