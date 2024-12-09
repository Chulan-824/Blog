<script setup>
import ImgOrb1 from './images/orb-01.png'
</script>

# Orbstack

## Orbstack 介绍

Orbstack 是一款开源的 Docker 环境管理工具，它可以帮助你更快地构建和部署 Docker 镜像，并且可以帮助你更好地管理你的 Docker 环境。

## 安装

通过homebrew安装

```bash
brew install orbstack
```

OrbStack 会自动为你配置好所有必要的 Docker 环境，包括：

- Docker daemon
- Docker CLI
- Docker Compose
- 容器运行时

::: tip 注
1. Docker daemon (Docker守护进程)
    - 运行在后台的服务，负责管理Docker容器的创建、运行和监控
    - 就像一个"管理员"，处理所有Docker相关的操作请求
2. Docker CLI (命令行接口)
    - 用户与Docker交互的命令行工具
    - 通过命令如 docker run、docker build 等来控制Docker
3. Docker Compose
    - 用于定义和运行多容器Docker应用的工具
    - 通过一个YAML文件配置多个容器的服务，使它们能够一起工作
4. 容器运行时 (Container Runtime)
    - 真正负责运行容器的底层组件
    - 管理容器的生命周期，包括创建、启动、停止和删除容器
:::

安装完成好后，可以通过`docker`命令来验证

```bash
docker --version
docker ps
```

## 使用 Orbstack

### Docker 镜像基本操作

1. 搜索镜像

```bash
docker search nginx  # 在Docker Hub上搜索nginx相关镜像
```

2. 拉取镜像
```bash
docker pull nginx:latest  # 拉取最新版本的nginx镜像
docker pull mysql:8.0     # 拉取指定版本的mysql镜像
```

<Image :src="ImgOrb1" />

> 直连会导致拉去一直等待，替换路径节点即可正常拉取

3. 查看镜像

```bash
docker images  # 列出本地所有镜像
docker image ls  # 同上，另一种写法
```

4. 删除镜像

```bash
docker rmi nginx:latest  # 删除最新版本的nginx镜像
docker rmi mysql:8.0     # 删除指定版本的mysql镜像
```

5. 镜像管理

```bash
# 查看镜像详细信息
docker inspect nginx:latest
docker inspect mysql:8.0

# 查看镜像历史
docker history nginx:latest
docker history mysql:8.0

# 为镜像添加标签
docker tag nginx:latest my-nginx:v1
docker tag mysql:8.0 my-mysql:v1

# 清理未使用的镜像
docker image prune  # 清理所有悬空镜像
docker image prune -a  # 清理所有未使用的镜像
```

### Docker 容器基本操作

1. 运行容器

```bash
# Nginx容器
docker run -d -p 80:80 --name my-nginx nginx:latest  # 后台运行nginx，映射80端口
docker run -d -p 80:80 -v /host/path:/usr/share/nginx/html nginx:latest  # 挂载本地目录

# MySQL容器
```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=12344321 \
  -v ~/docker-volumes/mysql/data:/var/lib/mysql \
  -v ~/docker-volumes/mysql/conf:/etc/mysql/conf.d \
  -v ~/docker-volumes/mysql/init:/docker-entrypoint-initdb.d \
  mysql:latest
```

::: tip 注
1. 首次运行时建议配置数据卷（Volumes），避免数据丢失
2. 端口映射如果本地 3306 被占用，可以映射到其他端口（如 3307:3306）
3. 环境变量中 MYSQL_ROOT_PASSWORD 是必须设置的（初始密码，登录后可以修改）
4. 配置完成后，容器会自动启动

- Name（容器名称）
- Port mappings（端口映射，如 3306:3306）
- Volumes（数据卷，建议配置）
- Environment variables（环境变量）
    * MYSQL_ROOT_PASSWORD（必填，root用户密码）
    * MYSQL_DATABASE（可选，初始数据库名）
    * MYSQL_USER（可选，新建用户名）
    * MYSQL_PASSWORD（可选，新建用户密码）
- --restart: 设置容器重启策略（always, unless-stopped, on-failure）
:::

2. 容器管理

```bash
# 查看容器
docker ps  # 查看运行中的容器
docker ps -a  # 查看所有容器

# 启动/停止容器
docker start my-nginx
docker start my-mysql
docker stop my-nginx
docker stop my-mysql

# 重启容器
docker restart my-nginx
docker restart my-mysql

# 删除容器
docker rm my-nginx  # 删除已停止的容器
docker rm -f my-nginx  # 强制删除运行中的容器
docker rm my-mysql
```

3. 容器日志和信息

```bash
# 查看容器日志
docker logs my-nginx
docker logs -f my-nginx  # 实时查看日志
docker logs --tail 100 my-mysql  # 查看最后100行日志

# 查看容器详细信息
docker inspect my-nginx
docker inspect my-mysql

# 查看容器资源使用情况
docker stats my-nginx
docker stats my-mysql
```

4. 容器交互

```bash
# 进入容器
docker exec -it my-nginx bash
docker exec -it my-mysql bash

# 从容器复制文件到主机
docker cp my-nginx:/etc/nginx/nginx.conf /host/path/
docker cp my-mysql:/etc/mysql/my.cnf /host/path/

# 从主机复制文件到容器
docker cp /host/file.html my-nginx:/usr/share/nginx/html/
```

::: tip 常用参数说明
- -d: 后台运行容器 `detach`（分离）
- -p: 端口映射，格式为 主机端口:容器端口
- -v: 挂载数据卷，格式为 主机目录:容器目录
- -e: 设置环境变量
- --name: 指定容器名称
- -it: 以交互模式运行容器
- --rm: 容器停止后自动删除
- --network: 指定容器网络
- --restart: 设置容器重启策略（always, unless-stopped, on-failure） 
:::


https://www.wxy97.com/archives/b5b225b6-7741-4560-be2f-2e6a4f671d9b#google_vignette