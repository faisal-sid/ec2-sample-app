#!/bin/bash

# Install Node.js
cd /tmp
wget https://nodejs.org/dist/v12.16.2/node-v12.16.2-linux-x64.tar.xz
tar -xJvf node-v12.16.2-linux-x64.tar.xz
rm node-v12.16.2-linux-x64.tar.xz
mkdir -p /opt/
mv node-v12.16.2-linux-x64 /opt/node

# Install the application in /opt
cd /opt
git clone https://github.com/buzypi/ec2-sample-app
cd ec2-sample-app
export PATH=$PATH:/opt/node/bin
npm install

# Create the service script
cat > /etc/systemd/system/app.service <<DELIM
[Unit]
Description=EC2 Sample App

[Service]
EnvironmentFile=/etc/environment
ExecStart=/opt/ec2-sample-app/start
User=root

[Install]
WantedBy=multi-user.target
DELIM

systemctl daemon-reload
systemctl start app