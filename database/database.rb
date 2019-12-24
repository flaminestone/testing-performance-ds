# frozen_string_literal: true

require_relative '../management'
require 'yaml'
DB = Sequel.sqlite('result.db')

DB.create_table? :results do
  primary_key :id
  String :filename
  String :user_id
  String :key
  DateTime :start_opening
  DateTime :end_opening
  DateTime :start_conversion
  DateTime :end_conversion
end
