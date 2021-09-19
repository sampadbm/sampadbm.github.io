require 'sinatra'
require 'json'
require 'httparty'

headers = { 
  "content-type"  => "application/json",
}



post '/forward' do
  headers "Access-Control-Allow-Origin"=>"*"
  payload = request.body.read
  #puts push
  puts payload
  HTTParty.post(
    "https://maker.ifttt.com/trigger/log/with/key/owfKAf8HDtiS-GyQoLwfn", 
    :body => payload,
    :headers => headers
  )
end
