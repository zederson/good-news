class TagsController < ApplicationController

  def index
  end

  def new
  end

  def create
    @tags = params[:tag_name]

    if @tags.blank?
      flash[:error] = t("tags.errors.tag_blank") if @tags.blank?
      render 'new'
    else
      redirect_to action: 'show', tags: @tags
    end
  end

  def show
    @tags = params[:tags]

    if @tags.blank?
      flash[:error] = t("tags.errors.tag_blank") if @tags.blank?
      redirect_to action: :new
    end

  end

end
