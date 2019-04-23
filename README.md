# steam-server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### 生成超级管理员密码

```bash
const md5 = require('md5')
md5('your pass word')
```

### 首次运行 admin

```bash
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

### nginx 配置 ssl 以及反向代理

```
server {
    listen 80;
    server_name steam.vgfuns.com www.vgfuns.com;
    #root /Users/welefen/Downloads/demo/www;
    set $node_port 7001;

    index index.js index.html index.htm;
    if ( -f $request_filename/index.html ){
        rewrite (.*) $1/index.html break;
    }
    if ( !-f $request_filename ){
        rewrite (.*) /index.js;
    }
    listen 443 ssl;
    ssl_certificate /usr/local/etc/nginx/ssl/ssl.crt;
    ssl_certificate_key /usr/local/etc/nginx/ssl/ssl.key;

    location = /index.js {
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:$node_port$request_uri;
        proxy_redirect off;
    }

    location ~ /static/ {
        etag         on;
        expires      max;
    }
}
```

### openssl 生成证书并添加到系统中

```bash
# 先创建配置 openssl.cnf

[req]
prompt = no
default_bits = 4096
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
C=CN
ST=Shanghai
L=Shanghai
O=TEST
OU=Testing Domain
CN=vgfuns.com
emailAddress=liusong850315@gmail.com

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = www.vgfuns.com
DNS.2 = steam.vgfuns.com

# 生成脚本command.sh

openssl req \
-new \
-newkey rsa:2048 \
-sha1 \
-days 3650 \
-nodes \
-x509 \
-keyout ssl.key \
-out ssl.crt \
-config openssl.cnf

# 导入到根并开发权限 security.sh

$ cd servers
sudo security add-trusted-cert \
-d -r trustRoot \
-k /Library/Keychains/System.keychain \
/usr/local/etc/nginx/ssl/ssl.crt

```
