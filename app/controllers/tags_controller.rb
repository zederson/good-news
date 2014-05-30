class TagsController < ApplicationController

  def index
  end

  def new
  end

  def create

    render 'new'
  end

  def listener
    @out = params[:tags]
  end

end
