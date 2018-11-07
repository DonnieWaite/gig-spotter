Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :bands, only: [:index, :show, :create]
      resources :bookers, only: [:index, :show, :create]
      resources :concerts, only: [:index, :show, :create]

      get "bands/:band_id/concerts", to: "bands#concerts"

    end
  end

  root 'homes#index'
  get '/bands/:id', to: 'homes#index'
  get '/band/new', to: 'homes#index'
  get '/bookers', to: 'homes#index'
  get '/bookers/:id', to: 'homes#index'
  get '/booker/new', to: 'homes#index'
  get '/concerts/:id', to: 'homes#index'
  get '/concert/new', to: 'homes#index'
  get '/concerts', to: 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
