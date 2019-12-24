# frozen_string_literal: true

require 'uri'
require 'faker'
require 'securerandom'
require 'net/http'
require 'onlyoffice_webdriver_wrapper'

class User
  attr_accessor :name, :id, :webdriver

  def initialize(option = {})
    if option == {}
      randomize
    else
      @id = option[:id]
      @name = option[:name]
      @key = option[:key]
    end
  end

  def randomize
    rand = Time.now.nsec.to_s
    @name = Faker::Name.name
    @id = rand
    @key = SecureRandom.alphanumeric(6)
  end

  def encoded
    URI.encode_www_form(name: @name, id: @id, key: @key)
  end

  def open(filename)
    @webdriver = OnlyofficeWebdriverWrapper::WebDriver.new(:chrome)
    @webdriver.open("http://192.168.3.195:9292/edit/#{filename}?" + User.new.encoded)
  end

  def waiting_commands(timeout = 30)
    result = nil
    timeout.times do |i|
      p "#{i}/Waiting for commands"
      @webdriver.browser_logs.each do |element|
        if element.message.include? 'I command you to close!'
          close
          result = :close
        end
      end
      sleep 1
      break unless result.nil?
    end
    !result.nil?
  end

  def close
    @webdriver.quit
  end
end
