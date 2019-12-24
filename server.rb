# frozen_string_literal: true

require_relative 'management'

class Api < Sinatra::Base
  before do
    @example_url = Settings::EXAMPLE_URL
    @documentserver = Settings::DOCUMENTSERVER_UPL
  end

  get '/public/plugin/:filename' do
    headers['x-frame-options'] = 'ALLOWALL'
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = %w[OPTIONS GET POST]
    headers['Content-Type'] = case params['filename']
                              when 'index.html'
                                'text/html'
                              when 'config.json'
                                'application/json'
                              when 'code.js'
                                'application/javascript'
                              when 'pluginBase.js'
                                'application/javascript'
                              when 'icon.png'
                                'image/x-icon'
                              else
                                'text/html'
                              end
    File.read(File.absolute_path("public/plugin/#{params['filename']}"))
  end

  get '/edit/*' do
    @document = params['splat'][0]
    @user_name = params['name'] || 'Noname'
    @user_id = params['id'] || Time.now.nsec.to_s
    @key = params['key'] || Time.now.nsec.to_s
    if @user_id && @user_name
      Result.create(user_id: @user_id, filename: @document, key: @key, start_opening: Time.now)
    end
    erb :edit
  end

  get '/view/*' do
    @document = params['splat'][0]
    p @document
    erb :view
  end

  post '/callback:filename' do
    return { error: 0 }.to_json
  end

  get '/timer' do
    Result.where(key: params['key']).update(end_opening: Time.now)
    { status: 'close' }.to_json
  end

  get '/' do
    erb :index
  end

  get '/get_result' do
    Result.where(key: params['key']).value.to_json
  end
end
