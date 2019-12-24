# frozen_string_literal: true

require 'sinatra'
require_relative 'server.rb'

run Rack::URLMap.new('/' => Api)

configure do
  set :root, File.dirname(__FILE__.to_s)
  enable :static
  enable :dump_errors
  set :show_exceptions, false # uncomment for testing or production
  set :port, Settings::EXAMPLE_PORT
  set :bind, Settings::EXAMPLE_HOST
end
