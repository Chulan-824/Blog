<script setup>
import ImgMongoDB1 from '../images/mongodb-1.png'
import ImgMongoDB2 from '../images/mongodb-2.png'
import ImgMongoDB3 from '../images/mongodb-3.png'
import ImgMongoDB4 from '../images/mongodb-4.png'
import ImgMongoDB5 from '../images/mongodb-5.png'
</script>

# MongoDB

## 手动安装

一、登录官网下载 [MongoDB官网](https://www.mongodb.com/zh-cn)

<Image :src="ImgMongoDB1" />

二、安装

1. 解压安装包：

- 打开 Finder，使用 `Shift + Command + G` 快捷键，输入 `/usr/local` 进入该目录（注意，`/usr/local`目录在 Finder 中默认是隐藏的）。
- 将下载的 `MongoDB` 压缩包解压到 `/usr/local` 目录下，并将解压后的文件夹重命名为 `mongodb（或其他你喜欢的名字，但后续步骤中的路径需要相应更改）。`

2. 配置环境变量：

- 打开终端（Terminal）。
- 输入 `open -e .bash_profile`（如果你使用的是 zsh，可能需要编辑 .zshrc 文件），打开 bash_profile 文件进行编辑。
- 在文件中添加一行配置，将MongoDB的bin目录添加到PATH环境变量中，例如：`export PATH=${PATH}:/usr/local/mongodb/bin`（确保路径与你的MongoDB安装路径一致）。
- 保存并关闭文件。
- 在终端中输入 `source .bash_profile`（或source .zshrc，如果你正在使用zsh）使配置生效。

3. 验证安装：  
   -在终端中输入 `mongod -version`，如果显示了 MongoDB 的版本号，则表示安装成功。

<Image :src="ImgMongoDB2" />

4. 创建数据目录和日志目录：

- 在 `/usr/local/mongodb`（或你的 MongoDB 安装目录）下创建 `data` 和 `log` 两个文件夹。可以使用命令 `mkdir data log` 来创建。
- 赋予这些文件夹适当的读写权限，例如使用 `sudo chmod 755 /usr/local/mongodb/data /usr/local/mongodb/log`。

5. 启动 MongoDB 服务

- 在终端中，进入 MongoDB 的 bin 目录（如果你已经将 bin 目录添加到 PATH，则可以直接执行以下命令）。
- 使用命令 `mongod --dbpath /usr/local/mongodb/data --logpath /usr/local/mongodb/log/mongod.log --logappend --fork` 来启动 MongoDB 服务。--fork 参数会让 MongoDB 在后台运行。

<Image :src="ImgMongoDB3" />
<Image :src="ImgMongoDB4" />

6. 关闭 MongoDB 服务

- pkill mongod
- pgrep mongod （查看 MongoDB 进程的 PID）

<Image :src="ImgMongoDB5" />

## 相关资料

[【mongodb】mac安装mongodb](https://juejin.cn/post/7403267077651955752?searchId=20240911165706122A56365A9D2B8FEF4B#heading-4)
