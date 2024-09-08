require 'spidr'

ssh_user      = "u28471@ctdp.net"    # for rsync deployment
remote_root   = "site2014/" # for rsync deployment

task :server do
  system("python3 -m http.server 4000")
end

task :deploy do
  system("rsync -avz --exclude-from=.rsync-exclude --omit-dir-times --delete . #{ssh_user}:#{remote_root}")
end

task :find_deadlinks do
  url_map = Hash.new { |hash, key| hash[key] = [] }

  spider = Spidr.site('http://localhost:3000/') do |spider|
    spider.every_link do |origin, dest|
      url_map[dest] << origin
    end
  end

  spider.failures.each do |url|
    puts "Broken link #{url} found in:"

    url_map[url].each { |page| puts "  #{page}" }
  end
end
