# 🚀 666 Hot Pot Spicy Slices 网站部署指南

## 项目状态 ✅

- **框架**: Next.js 15 + Tailwind CSS
- **本地构建**: ✅ 通过
- **Git 仓库**: ✅ 已初始化，318 个文件
- **所有页面**: 首页、产品页、评价页、加盟页、关于页、联系页、粉丝区、购物车、结账

---

## 第一步：推送到 GitHub（5分钟）

### 1.1 创建 GitHub 仓库
1. 打开浏览器，访问 https://github.com
2. 登录你的账号（没有账号就注册一个，免费）
3. 点击右上角 **"+"** → **"New repository"**
4. 填写信息：
   - Repository name: `666-hotpot-spicy-slices`
   - 选择 **Private**（私有）
   - **不要勾选** "Add a README file"
5. 点击 **"Create repository"**
6. 复制页面上显示的仓库地址

### 1.2 推送代码
打开 PowerShell，运行以下命令（替换 `你的用户名`）：

```powershell
cd "C:\Users\Administrator\WorkBuddy\20260415045727"
git remote add origin https://github.com/你的用户名/666-hotpot-spicy-slices.git
git branch -M main
git push -u origin main
```

---

## 第二步：部署到 Vercel（5分钟）

### 2.1 创建 Vercel 账号
1. 访问 https://vercel.com
2. 点击 **"Sign Up"** → **"Continue with GitHub"**

### 2.2 导入项目
1. 点击 **"Add New"** → **"Project"**
2. 找到 `666-hotpot-spicy-slices` 仓库，点击 **"Import"**
3. 点击 **"Deploy"** 按钮
4. 等待 2-3 分钟，部署完成！

---

## 第三步：绑定域名 666hotpotspicyslices.com

### 3.1 Vercel 中添加域名
1. 项目 Settings → Domains
2. 输入 `666hotpotspicyslices.com` → Add

### 3.2 DNS 配置（在域名购买平台操作）

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

DNS 生效后（1小时内），即可访问 https://666hotpotspicyslices.com

---

## 本地预览命令

```powershell
cd "C:\Users\Administrator\WorkBuddy\20260415045727"
npm run dev
# 打开 http://localhost:3000
```

## 推送更新

```powershell
git add .
git commit -m "更新内容"
git push
# Vercel 自动 2 分钟内重新部署
```
