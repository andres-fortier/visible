Rails.application.routes.draw do
  resources :stock_quotes, except: [:new, :edit]
end
