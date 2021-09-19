require 'sinatra'
require 'json'
require 'httparty'
require 'sinatra/cors'


set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "*"
#set :expose_headers, "*"

headers = { 
  "content-type"  => "application/json",
}

post '/forward' do
  payload = request.body.read
  #puts push
  puts payload
  HTTParty.post(
    "https://maker.ifttt.com/trigger/log/with/key/owfKAf8HDtiS-GyQoLwfn", 
    :body => payload,
    :headers => headers
  )
end
