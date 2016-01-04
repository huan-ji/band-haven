Rails.application.routes.draw do
  root to: "static_pages#root"
  resource :users, only: [:create, :show]
  resource :sessions, only: [:create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :albums, only: [:create, :destroy, :index, :show, :update] do
      resources :songs, only: [:index]
    end
    resources :songs, only: [:show]
    resources :genres, only: [:index]
    resources :sub_genres, only: [:index]
    resources :locations, only: [:index]
  end
end
