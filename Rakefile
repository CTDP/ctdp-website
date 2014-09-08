ssh_user      = "u28471@ctdp.net"    # for rsync deployment
remote_root   = "site2014/" # for rsync deployment

desc "push"
task :push do
  system("rsync -avz --exclude-from=.rsync-exclude --omit-dir-times --delete . #{ssh_user}:#{remote_root}")
end
