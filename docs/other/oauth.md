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
</script>

# OAuth 一键登录

## 1. OAuth 2.0 基础概念

### 1.1 OAuth 2.0 是什么？

OAuth 2.0 是一个**开放的授权标准协议**，主要用于解决第三方应用访问用户资源的授权问题。它允许用户授权第三方应用访问他们在其他服务提供商上的资源，而无需直接将用户名和密码提供给第三方应用。

### 1.2 为什么需要 OAuth？

**安全地授权第三方应用访问用户资源**。传统的直接使用用户名密码的方式存在严重的安全隐患，且用户体验差。OAuth 通过标准化的授权流程，既保护了用户的敏感信息（无需分享密码），又能精确控制授权范围（Scope），同时提供了便捷的一键登录体验。对开发者而言，它降低了身份认证的开发成本和安全风险，提供了可靠的用户认证方案。

OAuth 2.0 的核心角色

- 资源所有者（Resource Owner）
- 客户端（Client）
- 授权服务器（Authorization Server）
- 资源服务器（Resource Server）

## 2. OAuth 2.0 授权流程

- 授权码模式（Authorization Code Flow）
- 隐式授权模式（Implicit Flow）
- 密码模式（Password Flow）
- 客户端模式（Client Credentials Flow）

::: tip 参考文档

- [OAuth 2.0 官方规范](https://oauth.net/2/)
- [RFC 6749 - OAuth 2.0 框架](https://datatracker.ietf.org/doc/html/rfc6749)
- [Auth0 OAuth 2.0 文档](https://auth0.com/docs/protocols/oauth2)
  :::

## 3. 实战案例：Firebase OAuth 登录

### 3.1 授权模式对比

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
    Auth->>User: 3. 显示授权页面
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

### 3.2 Firebase 项目配置

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

## 4. 实战案例：Google OAuth 原生实现

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

## 5. 实战案例：Google One Tap 登录

### 5.1 什么是 Google One Tap？

Google One Tap 是 Google 推出的**新一代身份验证解决方案**，它提供了一种快速、无缝的登录体验。当用户访问支持 One Tap 的网站时，如果检测到用户已登录 Google 账号，系统会自动弹出一个登录提示，用户只需点击一次即可完成登录，无需手动输入用户名和密码。

One Tap 是对传统 Google Sign-In 的升级，它集成了 Google 的身份服务（Google Identity Services，简称 GIS）。这项技术不仅简化了登录流程，还提供了更好的安全保护和用户体验。

主要特点：

- 自动检测用户的 Google 账号
- 一键快速登录
- 支持自动登录（Auto Sign-in）
- 内置防欺诈保护
- 支持登录状态持久化
- 响应式设计，支持移动端和桌面端

### 5.2 One Tap 登录的优势

- **无缝用户体验**：用户无需点击登录按钮，系统自动检测 Google 账号并弹出登录提示
- **提高转化率**：根据 Google 官方数据，相比传统登录方式可提升 40% 的转化率
- **安全可靠**：采用 Google 安全基础设施，支持设备指纹和风险分析
- **跨设备同步**：用户在不同设备间可保持登录状态
- **自动记住登录状态**：支持智能持久化登录，减少重复登录操作

### 5.3 与传统 OAuth 登录的区别

- **交互方式**：传统 OAuth 需要跳转新页面，One Tap 直接在当前页面弹窗
- **用户操作**：传统方式需要多步操作，One Tap 只需一次点击确认
- **展现形式**：支持多种样式（Modal、Tooltip等），更灵活的界面定制
- **自动检测**：能自动检测并提示用户已登录的 Google 账号
- **智能时机**：根据用户行为智能选择提示时机，避免打扰用户

### 5.4 适用场景

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

### 5.2 前置准备

跟 Google OAuth 前置准备一样，创建

### 5.3 前端实现

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

### 5.4 后端实现

- 验证 Google ID Token
- 用户信息解析
- 会话管理

跟 Google OAuth 登录一致

::: tip 参考文档

- [Google Identity](https://developers.google.com/identity?hl=zh-cn)
  :::

<!-- ## 7. 常见问题（FAQ）

- 登录流程中断如何处理？
- 令牌过期怎么办？
- 如何处理跨域问题？
- 移动端适配注意事项
- 多平台 OAuth 统一管理
- 用户注销最佳实践 -->
