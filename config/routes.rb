Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :bands, only: [:index, :show]
      resources :bookers, only: [:index, :show]
    end
  end

  root 'homes#index'
  get '/bands/:id', to: 'homes#index'
  get '/bookers', to: 'homes#index'
  get '/bookers/:id', to: 'homes#index'
  get '/event/:id', to: 'homes#index'
  get '/event/new', to: 'homes#index'
  get '/events', to: 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
