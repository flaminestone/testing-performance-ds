task default: %w[all]

task :all do
  ruby 'lib/scripts/open_all.rb'
end
