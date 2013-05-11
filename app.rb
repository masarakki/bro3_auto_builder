require 'sinatra'
require 'haml'
require 'sass'

def version ; @_version ||= Time.now.to_i ; end

get '/' do
  @version = version
  haml :index
end

get '/bro3_auto_builder.user.js' do
  send_file 'bro3_auto_builder.user.js'
end

get '/style.css' do
  sass :style
end

get '/main.html' do
  mode = (params[:mode] || :html).to_sym
  @round_times = [30, 40, 50, 60, 90, 120, 150, 180, 360, 480, 600, 900]
  haml :main, layout: (mode != :partial)
end

get '/village.html' do
  mode = (params[:mode] || :html).to_sym
  haml :village, layout: (mode != :partial)
end

get '/village_row.html' do
  haml :village_row, layout: false
end

get '/village_updates.html' do
  haml :village_updates, layout: false
end

get '/sample.js' do
  coffee :sample
end
