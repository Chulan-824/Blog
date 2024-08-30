# 问题

## tailwindcss 背景图片和背景渐变兼容问题

### 方法一：背景图（relative）+ 子蒙层盒子定位（absolute）

:::code-group

```css [global.css]
.product-custom-gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 74.42%, #000 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 77.29%, #000 100%);
}
```

```tsx [index.tsx]
<div className="product-custom-gradient absolute inset-0"></div>
```

:::

infinitive 不定式
gerund 动名词
