# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'src', :output => 'build', :bare => true
guard 'coffeescript', :input => 'spec/javascripts/coffee', :output => 'spec/javascripts/js', :bare => true

guard :jasmine, :server => :jasmine_gem do
  watch(%r{spec/javascripts/spec\.(js\.coffee|js|coffee)$}) { 'spec/javascripts' }
  watch(%r{spec/javascripts/js/.+_spec\.(js\.coffee|js|coffee)$})
  watch(%r{build/(.+)\.js$}) { |m| "spec/javascripts/js/#{m[1]}_spec.js" }
  watch(%r{spec/javascripts/fixtures/.+$})
end
