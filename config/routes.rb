Rails.application.routes.draw do

  get "home/index"

  root to: "home#index"

  get  'tags/new',      to: 'tags#new'
  post 'tags/create',   to: 'tags#create'
  get  'tags/show',     to: 'tags#show'

end
