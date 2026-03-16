<div align="center">

<img src="app-icon.svg" width="96" height="96" alt="DevToys Icon" />

# DevToys

**A developer utilities app built with Tauri 2 + React + TypeScript**

![App Screenshot](https://github.com/user-attachments/assets/ab5151e3-1a45-430f-8ea1-9b2945e94e45)

[![Release](https://img.shields.io/github/v/release/dinorin/DevToys?style=flat-square&color=6366f1)](https://github.com/dinorin/DevToys/releases/latest)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-6366f1?style=flat-square)](https://tauri.app)

</div>

---

## Tools

| Category | Tools |
|---|---|
| **Encoders / Decoders** | Base64, URL Encoder, JWT Decoder |
| **Formatters** | JSON Formatter / Validator |
| **Generators** | Hash Generator (MD5 · SHA1 · SHA256 · SHA512), UUID Generator, Lorem Ipsum |
| **Text** | Text Diff, Text Case Converter, Markdown Preview |
| **Testers** | Regex Tester |
| **Converters** | Color Converter (HEX/RGB/HSL), Number Base, Unix Timestamp |

## Features

- 🌙 Dark / Light theme
- ⭐ Favorite tools
- 🕐 Recently used tools
- 🔍 Search across all tools
- ⚡ Fast hashing via Rust backend

## Download

Grab the latest installer from [**Releases**](https://github.com/dinorin/DevToys/releases/latest):

| Platform | File |
|---|---|
| Windows (Installer) | `DevToys_x.x.x_x64-setup.exe` |
| Windows (MSI) | `DevToys_x.x.x_x64_en-US.msi` |

## Tech Stack

- [Tauri 2](https://tauri.app) — Rust backend
- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [TailwindCSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) — icons
- [CodeMirror 6](https://codemirror.net) — code editors

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run tauri dev

# Build release
npm run tauri build
```

**Requirements:** [Rust](https://rustup.rs) + [Node.js](https://nodejs.org) 18+
