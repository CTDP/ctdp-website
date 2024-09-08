ssh_user      = "u28471@ctdp.net"    # for rsync deployment
remote_root   = "site2014/" # for rsync deployment

task :server do
  system("python3 -m http.server 4000")
end

task :deploy do
  system("rsync -avz --exclude-from=.rsync-exclude --omit-dir-times --delete . #{ssh_user}:#{remote_root}")
end
