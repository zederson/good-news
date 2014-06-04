Resque.redis = GoodNews.redis

Dir["/app/workers/*.rb"].each { |file| require file }
