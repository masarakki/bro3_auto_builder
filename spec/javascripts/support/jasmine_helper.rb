#Use this file to set/override Jasmine configuration options
#You can remove it if you don't need it.
#This file is loaded *after* jasmine.yml is interpreted.
#
#Example: using a different boot file.
#Jasmine.configure do |config|
#   config.boot_dir = '/absolute/path/to/boot_dir'
#   config.boot_files = lambda { ['/absolute/path/to/boot_dir/file.js'] }
#end
#

module Jasmine
  class UrlMapper
    def initialize(config)
      @config = config
    end

    def map_url_paths(paths)
      paths.map{|path| path}
    end
  end
end

module Jasmine
  class Configuration
    attr_writer :url_files
    def js_files_with_url
      map(@url_files || lambda { [] }, :url) + js_files_without_url
    end

    alias_method :js_files_without_url, :js_files
    alias_method :js_files, :js_files_with_url
  end
end

Jasmine.configure do |config|
  config.add_path_mapper(Jasmine::UrlMapper.method(:new))
  config.url_files = lambda {
    [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
      'http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js'
    ]
  }
end
