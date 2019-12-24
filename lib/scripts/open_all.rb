# frozen_string_literal: true

require 'bundler/setup'

require 'uri'
require 'onlyoffice_webdriver_wrapper'
require_relative '../../settings'
require_relative '../User'

Dir['../../public/documents/*'].each do |filepath|
  filename = File.basename(filepath)
  @user = User.new
  @user.open(filename)
  @user.waiting_commands
end
