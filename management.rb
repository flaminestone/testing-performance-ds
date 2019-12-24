# frozen_string_literal: true

require 'json'
require 'sinatra'
require_relative 'settings'
require 'sinatra/cross_origin'
require 'rack/contrib'
require 'sinatra'
require 'sequel'
require_relative 'database/database'
require_relative 'database/models/Result'
