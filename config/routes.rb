Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :bands, only: :index
    end
  end

  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
