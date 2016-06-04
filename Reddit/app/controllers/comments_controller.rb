class CommentsController < ApplicationController
  def new
    @comment = Comment.new(post_id: params[:post_id])
    render :new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    @comment.save
    redirect_to post_url(@comment.post)
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def upvote
    comment = Comment.find(params[:id])
    Vote.create(value: 1, votable: comment)
    redirect_to post_url(comment.post)
  end

  def downvote
    comment = Comment.find(params[:id])
    Vote.create(value: -1, votable: comment)
    redirect_to post_url(comment.post)
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end
end
