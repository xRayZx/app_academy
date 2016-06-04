class SubsController < ApplicationController
  before_action :require_moderator!, only: [:edit, :update, :destroy]

  def new
    @user = User.find(params[:user_id])
    @sub = Sub.new(moderator_id: params[:user_id])
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    if @sub.save
      redirect_to subs_url
    else
      render :new
    end
  end

  def edit
    @sub = Sub.find(params[:id])
    if current_user.id == @sub.moderator_id
      render :edit
    else
      redirect_to sub_url(@sub)
    end
  end

  def update
    @sub = Sub.find(params[:id])
    @sub.update_attributes!(sub_params)
    redirect_to sub_url(@sub)
  end

  def show
    @sub = Sub.find(params[:id])
    render :show
  end

  def index
    @subs = Sub.all
    render :index
  end

  def destroy
    @sub = Sub.find(params[:id])
    @sub.destroy
    redirect_to subs_url
  end

  protected
  def sub_params
    params.require(:sub).permit(:title, :description, :moderator_id)
  end
end
