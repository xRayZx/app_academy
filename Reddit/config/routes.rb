Rails.application.routes.draw do
  resources :users do
    resources :subs, only: :new
  end

  resource :session, only: [:new, :create, :destroy]
  resources :subs, except: :new do
    resources :posts, only: :new
  end

  resources :posts, except: [:new, :index] do
    resources :comments, only: :new
  end

  post '/subs/:sub_id/posts/:post_id/upvote', to: 'posts#upvote', as: 'post_upvote'
  post '/subs/:sub_id/posts/:post_id/downvote', to: 'posts#downvote', as: 'post_downvote'

  post '/comments/:id/upvote', to: 'comments#upvote', as: 'comment_upvote'
  post '/comments/:id/downvote', to: 'comments#downvote', as: 'comment_downvote'

  resources :comments, only: [:create, :show]
end
