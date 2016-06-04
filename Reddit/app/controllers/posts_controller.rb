class PostsController < ApplicationController
  before_action :require_author!, only: [:edit, :update, :destroy]

  def new
    @sub = Sub.find(params[:sub_id])
    @post = Post.new(sub_id: params[:sub_id])
    render :new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @post.sub_ids = post_params[:sub_ids]
    if @post.save
      redirect_to post_url(@post)
    else
      render :new
    end
  end

  def destroy
    @post = Post.find(params[:id])
    sub_id = @post.sub
    @post.destroy
    redirect_to sub_url(sub_id)
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def edit
    @post = Post.find(params[:id])
    render :edit
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes!(post_params)
    redirect_to post_url(@post)
  end

  def upvote
    post = Post.find(params[:post_id])
    Vote.create(value: 1, votable: post)
    redirect_to sub_url(params[:sub_id])
  end

  def downvote
    post = Post.find(params[:post_id])
    Vote.create(value: -1, votable: post)
    redirect_to sub_url(params[:sub_id])
  end

  private
  def post_params
    params.require(:post).permit(:title, :url, :content, :user_id, sub_ids: [])
  end
end
