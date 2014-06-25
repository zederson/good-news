class HomeController < ApplicationController
  def index
    redirect_to "/tags/new"
  end
end
