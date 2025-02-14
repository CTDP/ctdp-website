ssh_user      = "u28471@ctdp.net"    # for rsync deployment
remote_root   = "site2025/" # for rsync deployment

task :deploy do
  system("npm run build")
  system("rsync -avz --exclude-from=.rsync-exclude --omit-dir-times --delete dist/ #{ssh_user}:#{remote_root}")
end
