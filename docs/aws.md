```
sudo apt update && sudo apt install -y nginx git curl unzip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Go (latest version - you can adjust as needed)
wget https://go.dev/dl/go1.24.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.24.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile

# Install PM2
sudo npm install -g pm2

```

```
git clone https://github.com/your-username/your-repo.git dfc-ui
cd dfc-ui
```

```
cd api
go mod download
CGO_ENABLED=0 GOOS=linux go build -o backend main.go
pm2 start ./backend --name dfc-backend

```

```
cd ../ui
npm install
pm2 start npm --name dfc-frontend -- run dev
```

```
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-available/dfc-ui

```

```
server {
    listen 80;
    server_name dfc-ui.rtcxf.com;

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

```
sudo ln -s /etc/nginx/sites-available/dfc-ui /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

```
pm2 startup
pm2 save
```