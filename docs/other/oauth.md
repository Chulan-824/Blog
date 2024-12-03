<script setup>
import ImgOauth1 from './images/oauth-1.png'
import ImgOauth2 from './images/oauth-2.png'
import ImgOauth3 from './images/oauth-3.png'
import ImgOauth4 from './images/oauth-4.png'
import ImgOauth5 from './images/oauth-5.png'
import ImgOauth6 from './images/oauth-6.png'
import ImgOauth7 from './images/oauth-7.png'
import ImgOauth8 from './images/oauth-8.png'
import ImgOauth9 from './images/oauth-9.png'
import ImgOauth10 from './images/oauth-10.png'
import ImgOauth11 from './images/oauth-11.png'
</script>

# OAuth 一键登录

## 1. OAuth 2.0 基础概念

### 1.1 OAuth 2.0 是什么？

OAuth 2.0 是一个**开放的授权标准协议**，主要用于解决第三方应用访问用户资源的授权问题。它允许用户授权第三方应用访问他们在其他服务提供商上的资源，而无需直接将用户名和密码提供给第三方应用。

### 1.2 为什么需要 OAuth？

**安全地授权第三方应用访问用户资源**。传统的直接使用用户名密码的方式存在严重的安全隐患，且用户体验差。OAuth 通过标准化的授权流程，既保护了用户的敏感信息（无需分享密码），又能精确控制授权范围（Scope），同时提供了便捷的一键登录体验。对开发者而言，它降低了身份认证的开发成本和安全风险，提供了可靠的用户认证方案。

### 1.3 核心角色

- 资源所有者（Resource Owner）：即用户本人。比如，想要使用自己的Google账号登录某个第三方应用的用户。

- 客户端（Client）：代表第三方应用。比如，想要获取用户Google账号信息的应用程序，可以是网站、手机App等。

- 授权服务器（Authorization Server）：负责验证用户身份并颁发访问令牌的服务器。比如，Google的登录服务器，用来处理用户登录和授权的请求。

- 资源服务器（Resource Server）：存储用户受保护资源的服务器。比如，存储用户Google个人信息（邮箱、头像等）的服务器。

## 2. OAuth 2.0 授权流程

- 授权码模式（Authorization Code Flow）
- 隐式授权模式（Implicit Flow）
- 密码模式（Password Flow）
- 客户端模式（Client Credentials Flow）

授权码模式是OAuth 2.0中最完整、最安全的授权流程，主要用于服务器端应用。

<MermaidDiagram :diagram="`
sequenceDiagram
    participant User as 资源所有者
    participant Client as 客户端
    participant Auth as 授权服务器
    participant Resource as 资源服务器
    User->>Client: 1. 访问应用
    Client->>User: 2. 重定向到授权页面
    Note over User,Auth: 带上client_id、redirect_uri、scope等参数
    User->>Auth: 3. 用户登录并授权
    Auth->>User: 4. 返回授权码code
    User->>Client: 5. 重定向回客户端（带授权码）
    Client->>Auth: 6. 用code换取access_token
    Note over Client,Auth: 带上client_secret进行验证
    Auth->>Client: 7. 返回access_token
    Client->>Resource: 8. 使用access_token请求资源
    Resource->>Client: 9. 返回受保护的资源
`" />

::: tip 参考文档

- [OAuth 2.0 官方规范](https://oauth.net/2/)
- [RFC 6749 - OAuth 2.0 框架](https://datatracker.ietf.org/doc/html/rfc6749)
- [Auth0 OAuth 2.0 文档](https://auth0.com/docs/protocols/oauth2)
  :::

## 3. 第三方登录方案选择

### 3.1 原生SDK方案（Google为例）

1. **优点**
   - 直接集成，无需中间层
   - 完整的功能支持
   - 最新特性支持
   - 可定制性强
2. **实现方式**
   - 使用Google Sign-In SDK
   - 配置OAuth 2.0客户端凭据
   - 实现登录流程和回调处理

### 3.2 第三方集成平台（Firebase Authentication）

Firebase 是由 James Tamplin 和 Andrew Lee 于2011年创建的实时数据库平台，最初名为Envolve。2014年10月，Firebase 被 Google 收购，此后成为 Google Cloud Platform 的重要组成部分。Firebase 提供了一套完整的应用开发平台，其中 Firebase Authentication 是其最受欢迎的服务之一。

作为一个Backend-as-a-Service (BaaS)平台，Firebase 极大地简化了应用开发流程，特别是在身份认证、实时数据库、托管和分析等方面。Firebase Authentication 服务让开发者能够轻松实现安全的用户认证系统，支持多种认证方式，并与其他 Firebase 服务无缝集成。

1. **优势**
   - 统一管理多个身份提供商
   - 简化的API接口
   - 现成的用户管理系统
   - 安全性保障
   - 跨平台统一API支持
2. **支持的登录方式**
   - Google
   - Facebook
   - Twitter
   - GitHub
   - 手机号验证
   - 邮箱密码

### 3.3 方案对比与选择建议

#### 方案对比表

| 考虑因素 | 原生SDK方案 | 集成平台方案 |
|---------|------------|-------------|
| 适用场景 | 单一平台登录 | 多种登录方式 |
| 开发成本 | 较高 | 较低 |
| 定制能力 | 完全可控 | 受平台限制 |
| 维护成本 | 较高 | 较低 |
| 性能表现 | 最优 | 略有损耗 |
| 功能更新 | 需要单独更新 | 平台统一更新 |
| 用户管理 | 需要自行实现 | 平台提供 |
| 跨平台支持 | 需要分别实现 | 统一API |
| 适合项目 | 性能敏感型<br>深度定制型 | 快速开发型<br>多平台支持型 |

当前根据公司其他项目已经使用 Firebase,则选择集成平台方式实现第三方登录。

::: tip 当前为什么使用 Firebase
走访调查了解到公司当时使用 Firebase 是处于公司的 app 应用，需要有一个跨平台统一API支持，所以选择使用Firebase 去做第三方登录，后面有新的 Web 应用也使用了 Firebase，所以保持统一，新的 Web 项目也都使用 Firebase。
:::

## 4. 实战案例：Firebase OAuth 登录

### 4.1 授权模式对比

标准隐式授权模式
<MermaidDiagram :diagram="`
sequenceDiagram
    participant User as 用户
    participant Client as 客户端应用
    participant Auth as 授权服务器
    participant Resource as 资源服务器
    Note over Auth,Resource: 预先建立信任关系<br/>共享密钥或证书
    User->>Client: 1. 点击登录
    Client->>Auth: 2. 重定向到授权页面<br/>response_type=token<br/>client_id, redirect_uri, scope, state
    Auth->>User: 4. 显示授权页面
    User->>Auth: 4. 同意授权
    Auth->>Client: 5. 重定向回客户端<br/>返回access_token
    Client->>Resource: 6. 请求资源<br/>携带access_token
    Resource->>Auth: 7. 验证token有效性
    Auth->>Resource: 8. 返回token信息<br/>（用户身份、权限等）
    Resource->>Client: 9. 返回受保护的资源
`"/>

Firebase 隐式授权模式
<MermaidDiagram :diagram="`
sequenceDiagram
    participant User as 用户
    participant Client as 前端应用
    participant Firebase as Firebase Auth
    participant Google as Google OAuth
    participant Backend as 后端服务
    User->>Client: 1. 点击 Google 登录
    Client->>Firebase: 2. 调用 signInWithPopup
    Firebase->>Google: 3. 打开 Google 登录页面
    Google->>User: 4. 显示授权页面
    User->>Google: 5. 同意授权
    Google->>Firebase: 6. 返回认证信息
    Firebase->>Client: 7. 返回 Firebase idToken
    Client->>Backend: 8. 请求登录 API<br/>携带 Firebase idToken
    Backend->>Firebase: 9. 验证 idToken 有效性 获取 Firebase User
    Backend->>Backend: 10. 生成应用 Token
    Backend->>Client: 11. 返回应用 Token
    Client->>Client: 12. 存储 Token<br/>更新登录状态
`"/>

### 4.2 Firebase 项目配置

基础配置

<Image :src="ImgOauth3" width="50%" />

<Image :src="ImgOauth4" width="50%" />

::: warning 注意  
一定要在 Authentication 配置的网域添加项目的测试正式服地址，不然上线后会报错未授权 domain，创建是会默认生成图上配置 3 个域名
:::

前端配置

- apiKey：项目的 API 密钥
- authDomain：认证域名
- projectId：项目唯一标识
- appId：应用 ID

<Image :src="ImgOauth1" />

进入项目设置 -> 常规 -> 您的应用 -> SDK 设置和配置 -> 安装 firebase 依赖 -> 添加 firebaseConfig 依赖

后端配置

- 服务账号密钥文件（Service Account Key）：包含项目级别的认证凭据
- Admin SDK 配置：用于后端验证 Firebase Token 和访问 Firebase 服务
- 项目 ID 和私钥：用于初始化 Firebase Admin SDK

<Image :src="ImgOauth2" />

进入项目设置 -> 服务账号 -> 根据后端语言选择对应的 Admin SDK 秘钥生成 JSON 文件

### 4.3 注意

<Image :src="ImgOauth11" />

后端验证 Firebase Token 后返回的信息中比较重要的地方在 **firebase.identities**。

它记录了用户的身份认证信息，包含两个重要部分：用户使用的登录方式（如Google、GitHub等）以及在各平台的唯一标识符（uid）。当在 Firebase 控制台中启用了多个身份提供商并允许账号关联后，用户可以将不同平台的账号关联到同一个 Firebase 账号下，实现多平台统一登录。

如果开启多平台登录，最新的登录方式 firebase 对象会多返回 

- firebase.sign_in_provider // 表明本次是通过 xx 登录

## 5. 实战案例：Google OAuth 原生实现

创建 Google Cloud Project

<Image :src="ImgOauth5"  />

配置 OAuth 权限

<Image :src="ImgOauth6"  />

创建 OAuth 2.0 凭据

<Image :src="ImgOauth7"  />

<Image :src="ImgOauth8"  />

<Image :src="ImgOauth9"  />

创建后会获得一个客户端 ID 和 客户端秘钥

- 前端实现
  - 引入 Google OAuth 库
  - 配置客户端 ID
  - 实现登录按钮
  - 处理授权回调
- 后端实现
  - 验证 ID Token
  - 创建会话
  - 用户信息存储

流程跟 Firebase 差不多，只是具体的库不同

## 6. 实战案例：Google One Tap 登录

### 6.1 什么是 Google One Tap？

Google One Tap 是 Google 推出的**新一代身份验证解决方案**，它提供了一种快速、无缝的登录体验。当用户访问支持 One Tap 的网站时，如果检测到用户已登录 Google 账号，系统会自动弹出一个登录提示，用户只需点击一次即可完成登录，无需手动输入用户名和密码。

One Tap 是对传统 Google Sign-In 的升级，它集成了 Google 的身份服务（Google Identity Services，简称 GIS）。这项技术不仅简化了登录流程，还提供了更好的安全保护和用户体验。

<Image :src="ImgOauth10"  />

主要特点：

- 自动检测用户的 Google 账号
- 一键快速登录
- 支持自动登录（Auto Sign-in）
- 内置防欺诈保护
- 支持登录状态持久化
- 响应式设计，支持移动端和桌面端

### 6.2 One Tap 登录的优势

- **无缝用户体验**：用户无需点击登录按钮，系统自动检测 Google 账号并弹出登录提示
- **提高转化率**：根据 Google 官方数据，相比传统登录方式可提升 40% 的转化率
- **安全可靠**：采用 Google 安全基础设施，支持设备指纹和风险分析
- **跨设备同步**：用户在不同设备间可保持登录状态
- **自动记住登录状态**：支持智能持久化登录，减少重复登录操作

### 6.3 与传统 OAuth 登录的区别

- **交互方式**：传统 OAuth 需要跳转新页面，One Tap 直接在当前页面弹窗
- **用户操作**：传统方式需要多步操作，One Tap 只需一次点击确认
- **展现形式**：支持多种样式（Modal、Tooltip等），更灵活的界面定制
- **自动检测**：能自动检测并提示用户已登录的 Google 账号
- **智能时机**：根据用户行为智能选择提示时机，避免打扰用户

### 6.4 适用场景

- **内容平台**：新闻、博客等需要快速访问的网站
- **电商网站**：购物车结算等关键转化环节
- **SaaS 应用**：企业协作工具等需要频繁登录的场景
- **移动端网页**：支持响应式设计，适配各种屏幕尺寸
- **高频操作场景**：需要反复登录的应用场景

::: tip 参考文档

- [Google One Tap 官方文档](https://developers.google.com/identity/one-tap/web)
- [One Tap 最佳实践指南](https://developers.google.com/identity/gsi/web/guides/best-practices)
- [One Tap 集成示例](https://developers.google.com/identity/gsi/web/guides/display-button)
- [One Tap 安全考虑](https://developers.google.com/identity/gsi/web/guides/security)
  :::

### 6.5 前置准备

跟 Google OAuth 前置准备一样，创建

### 6.6 前端实现

- 引入 Google One Tap SDK
- 初始化配置
- 登录按钮实现
- 处理登录回调
- 自动登录处理

```ts
const GOOGLE_AUTH_CLIENT_ID = 'YOUR_AUTH_CLIENT_ID'

// google client script注入&初始化
const initGoogleClient = useCallback(
  (callback: (res: IInitializeResponse) => void) => {
    const script = document.createElement('script')
    if (!(window as any).google) {
      script.src = 'https://accounts.google.com/gsi/client' // 加载客户端库
      script.async = true
      script.onload = () => initializeGoogleOneTap(callback)
      document.head.appendChild(script)
    } else {
      initializeGoogleOneTap(callback)
    }
  },
  []
)

//  初始化并提示(弹窗)
const initializeGoogleOneTap = useCallback(
  (callback: (res: IInitializeResponse) => void) => {
    ;(window as any).google?.accounts?.id?.initialize({
      client_id: GOOGLE_AUTH_CLIENT_ID,
      callback,
      cancel_on_tap_outside: false, // 控制是否在提示之外进行点击时取消提示(关闭一键登录弹窗)，默认true
      auto_select: false, // 开启自动登录功能，默认false
      use_fedcm_for_prompt: true,
      supported_browser_features: {
        fedcm: {
          support_fedcm_web_api: true,
        },
      },
    })

    // 修改 prompt 调用
    ;(window as any).google?.accounts?.id?.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.log('未显示原因:', notification.getNotDisplayedReason())
      } else if (notification.isSkippedMoment()) {
        console.log('跳过原因:', notification.getSkippedReason())
      } else if (notification.isDismissedMoment()) {
        console.log('关闭原因:', notification.getDismissedReason())
      }
    })
  },
  []
)

// 关闭 Google One Tap 弹窗的方法
const closeGoogleOneTap = useCallback(() => {
  ;(window as any)?.google?.accounts?.id.cancel()
  ;(window as any)?.google?.accounts?.id.disableAutoSelect()
}, [])
```

### 6.7 后端实现

- 验证 Google ID Token
- 用户信息解析
- 会话管理

跟 Google OAuth 登录一致

::: tip 参考文档

- [Google Identity](https://developers.google.com/identity?hl=zh-cn)
  :::

## 7. Next-Auth

### 7.1 什么是 Next-Auth？

Next-Auth（现已更名为 Auth.js）是一个为 Next.js 应用设计的完整身份认证解决方案。它提供了一套简单但功能强大的 API，使得在 Next.js 应用中实现各种认证方案变得异常简单。虽然最初是为 Next.js 设计，但现在它已经支持其他框架，如 SvelteKit、SolidStart 等。

### 7.2 为什么选择 Next-Auth？

1. **开箱即用的特性**
   - 支持多种认证提供商（OAuth、Email、Credentials等）
   - 内置会话管理
   - 自动CSRF令牌处理
   - JWT或数据库会话
   - 自动刷新token

2. **安全性考虑**
   - 默认采用安全配置
   - CSRF保护
   - JWTs 处理
   - 安全的cookie处理
   - 内置XSS保护

3. **开发体验**
   - 极简的API设计
   - TypeScript支持
   - 零配置数据库支持
   - 自动类型生成
   - 中间件支持

### 7.3 与其他方案对比

| 特性 | Next-Auth | Firebase Auth | 原生OAuth实现 |
|------|-----------|---------------|--------------|
| 配置复杂度 | 低 | 中 | 高 |
| 集成难度 | 极简 | 简单 | 复杂 |
| 定制灵活性 | 高 | 中 | 极高 |
| 维护成本 | 低 | 低 | 高 |
| 数据库支持 | 多种选择 | Firebase专属 | 自定义 |
| 框架限制 | 主要支持Next.js | 全平台 | 无限制 |
| 社区支持 | 活跃 | 非常活跃 | 分散 |

::: tip 为什么考虑Next-Auth
在评估第三方登录方案时，Next-Auth是一个很有竞争力的选择，特别是对于Next.js项目。它提供了：
1. 极简的开发体验
2. 完整的类型支持
3. 灵活的数据库适配
4. 活跃的社区支持

不过最终我们选择了Firebase，主要考虑到：
1. 跨平台统一性需求
2. 已有项目的技术栈统一
3. Firebase提供的其他服务整合
:::

### 7.4 Next-Auth 认证流程对比

#### Next.js 全栈应用中的 Next-Auth 流程

<MermaidDiagram :diagram="`
sequenceDiagram
    participant User as 用户
    participant Client as Next.js前端
    participant NextAuth as Next-Auth
    participant APIRoutes as Next.js API Routes
    participant DB as 数据库
    participant OAuth as OAuth提供商
    User->>Client: 点击登录
    Client->>NextAuth: 调用signIn()
    NextAuth->>OAuth: 重定向到OAuth登录页
    OAuth-->>NextAuth: 返回授权码
    NextAuth->>OAuth: 使用授权码获取token
    OAuth-->>NextAuth: 返回access_token
    NextAuth->>APIRoutes: 创建会话
    APIRoutes->>DB: 存储用户信息
    DB-->>APIRoutes: 确认存储
    APIRoutes-->>NextAuth: 返回session
    NextAuth-->>Client: 设置session cookie
    Client-->>User: 登录成功
`" />

#### 前后端分离项目中使用 Next-Auth（不推荐）

<MermaidDiagram :diagram="`
sequenceDiagram
    participant User as 用户
    participant Client as Next.js前端
    participant NextAuth as Next-Auth
    participant Backend as 独立后端
    participant OAuth as OAuth提供商
    User->>Client: 点击登录
    Client->>NextAuth: 调用signIn()
    NextAuth->>OAuth: 重定向到OAuth登录页
    OAuth-->>NextAuth: 返回授权码
    NextAuth->>OAuth: 使用授权码获取token
    OAuth-->>NextAuth: 返回access_token
    Note over NextAuth,Backend: 这里开始出现流程冗余
    NextAuth->>Backend: 发送OAuth token
    Backend->>Backend: 验证token
    Backend->>Backend: 生成自己的JWT
    Backend-->>Client: 返回后端JWT
    Note over Client: 需要同时处理<br/>Next-Auth session<br/>和后端JWT
    Client-->>User: 登录成功
`" />

::: warning 前后端分离架构的问题
从上面的流程图可以看出，在前后端分离的架构中使用Next-Auth会导致：
1. 认证流程冗余：需要同时维护Next-Auth的session和后端的JWT
2. 状态管理复杂：前端需要处理两套认证状态
3. 安全风险：可能出现session和JWT不同步的情况
:::

### 7.5 使用场景与限制

#### 最适合的场景
1. **Next.js全栈应用**
   - 使用Next.js的API Routes作为后端
   - 需要快速搭建完整的认证系统
   - 项目从零开始，可以完全接受Next-Auth的认证流程

2. **小型到中型项目**
   - 团队规模较小
   - 需求相对标准化
   - 认证逻辑不太复杂

#### 不太适合的场景
1. **传统前后端分离项目**
   - 已有专门的后端团队
   - 后端有自己的JWT生成和验证逻辑
   - 需要完全自定义的认证流程
   - 需要与现有后端系统深度集成

2. **企业级复杂应用**
   - 有特殊的认证需求
   - 需要完全控制认证流程
   - 需要与已有的用户系统集成
   - 有复杂的权限管理需求

::: warning 注意事项
如果你的项目是传统的前后端分离架构，后端已经有成熟的JWT认证系统，使用Next-Auth可能会：
1. 增加不必要的复杂性
2. 造成认证流程的冗余
3. 带来额外的维护成本
4. 限制后端的认证逻辑自定义

在这种情况下，建议：
- 使用原生OAuth实现
- 直接对接后端的认证系统
- 或考虑像Firebase这样的跨平台解决方案
:::