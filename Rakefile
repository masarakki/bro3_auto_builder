require 'open-uri'
require 'fileutils'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :resource do
  desc 'fetch resources'
  task :fetch do
    resource_dir = File.expand_path "../spec/javascripts/fixtures/resources", __FILE__
    FileUtils.mkdir_p(resource_dir) unless File.exists? resource_dir

    require 'rack'
    require_relative './app'
    rack = Rack::MockRequest.new(Sinatra::Application)

    files = {
      main_template: "/main.html?mode=partial",
      village_template: "/village.html?mode=partial",
      village_row: "/village_row.html?mode=partial",
      village_updates: "/village_updates.html?mode=partial",
      setting_template: "/setting.html?mode=partial"
    }

    files.each do |resource_name, url|
      file = File.join resource_dir, resource_name.to_s
      File.open(file, 'w') do |output|
        output.write rack.request(:get, url).body
      end
    end
  end
end
