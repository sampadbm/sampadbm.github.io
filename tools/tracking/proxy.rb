require 'sinatra'
require 'json'
require 'httparty'
require 'sinatra/cross_origin'


#set :allow_origin, "*"
#set :allow_methods, "GET,HEAD,POST"
#set :allow_headers, "*"
#set :expose_headers, "*"

headers = { 
  "content-type"  => "application/json",
}


# To enable cross origin requests for all routes:
configure do
  enable :cross_origin
end


options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
 
  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
 
  200
end

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
