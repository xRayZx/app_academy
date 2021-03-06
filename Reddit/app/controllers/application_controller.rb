class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !current_user.nil?
  end

  def require_moderator!
    @sub = Sub.find(params[:id])
    redirect_to subs_url unless @sub.moderator_id == current_user.id
  end

  def require_author!
    @post = Post.find(params[:id])
    redirect_to post_url(@post) unless @post.user_id == current_user.id
  end

  protected
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
