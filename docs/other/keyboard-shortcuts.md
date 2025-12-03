# Keyboard Shortcuts

## IntelliJ IDEA

|                      |                描述                |
| :------------------: | :--------------------------------: |
|    Option + Enter    |         查看弹出的修复建议         |
| Shift + Command + ↑↓ |            移动行(上下)            |
|    Shift + Enter     |            切换到下一行            |
| Option + Command + L |               格式化               |
|     Control + G      | 逐个选中代码中后续匹配的字符或单词 |
|   Cmd + Shift + /    |              多行注释              |
|       Cmd + D        |    当前行的代码会被复制到下一行    |
|       Cmd + N        |           打开代码生成器           |

## Github Copilot

|              |             描述             |
| :----------: | :--------------------------: |
|     Tab      |           接受建议           |
|     Esc      |           拒绝建议           |
| Ctrl + Enter | 打开 Copilot Suggestion 面板 |
|  Option + ]  |          下一条建议          |
|  Option + [  |          上一条建议          |
| Option + \   |       触发行内 Copilot       |

## Terminal

生成 64 位十六进制数字

```bash
openssl rand -hex 32
```

生成 uuid

```bash
uuidgen
```

## python

设置虚拟环境

```bash
python3 -m venv /Users/chulan/project/Python/venv
```

```bash
source /Users/chulan/project/Python/venv/bin/activate
```

退出虚拟环境

```bash
deactivate
```

## pyenv

设置项目虚拟环境

```bash
# python -m venv <虚拟环境文件夹名>
python -m venv venv
```

激活虚拟环境

```bash
source venv/bin/activate
```

退出虚拟环境

```bash
deactivate
```
