<div align="center">

<img src="https://raw.githubusercontent.com/AgentLayer1/vscode-cmux-open/main/assets/icon.png" alt="Open in cmux" width="128" height="128" />

# Open in cmux

**Right-click any folder in VS Code — open it as a [cmux](https://cmux.com) workspace.**

[![Marketplace](https://badgen.net/vs-marketplace/v/agentlayer.cmux-open-workspace?label=marketplace&color=8B5CF6)](https://marketplace.visualstudio.com/items?itemName=agentlayer.cmux-open-workspace)
[![Platform](https://img.shields.io/badge/platform-macOS-22D3EE?style=flat-square&logo=apple&logoColor=white)](#requirements)
[![License](https://img.shields.io/badge/license-MIT-10B981?style=flat-square)](./LICENSE)
[![AgentLayer](https://img.shields.io/badge/by-AgentLayer-0B0B0F?style=flat-square)](https://agentlayer.one)

</div>

---

## What it does

A one-click bridge from the VS Code Explorer into the [cmux](https://cmux.com) desktop app. No shell helpers, no symlinks, no env vars — the extension hands the folder path to cmux through the macOS Service the app already registers.

<div align="center">
  
<img src="https://raw.githubusercontent.com/AgentLayer1/vscode-cmux-open/main/assets/screenshot.png" alt="Open in cmux" width="400" />

| Step | Action                                              |
| ---- | --------------------------------------------------- |
| 1    | Right-click any folder in the Explorer              |
| 2    | Choose **Open in cmux Workspace**                   |
| 3    | A fresh cmux workspace opens, scoped to that folder |

</div>

---

## Requirements

- **macOS.** The extension drives a native macOS Service, so Linux and Windows are not supported.
- **cmux desktop app** installed and launched at least once, so the `New cmux Workspace Here` Service is registered with macOS.
- **VS Code** `1.98.0` or newer.

---

## Usage

Right-click a folder in the Explorer and pick **Open in cmux Workspace**, or open the Command Palette (`⌘⇧P`) and run the same command.

File selections resolve to their parent directory, so right-clicking a file inside the folder you want works too.

---

## Troubleshooting

<details>
<summary><b>"NSPerformService failed for: New cmux Workspace Here"</b></summary>

The macOS Service isn't registered. Launch the cmux app once, then open **System Settings → Keyboard → Keyboard Shortcuts → Services** and confirm `New cmux Workspace Here` is enabled. A logout/login may be required after first install.

</details>

<details>
<summary><b>Nothing happens on click</b></summary>

Run the command from the Command Palette (`⌘⇧P` → "Open in cmux Workspace") so the error toast surfaces. Check the VS Code Output panel for stderr from the underlying `osascript` call.

</details>

---

## About

This VS Code extension is built and maintained by **[AgentLayer](https://agentlayer.one)**, we ship AI agent infrastructure and use [cmux](https://cmux.com) heavily in our day-to-day for parallel, agent-driven development.

<sub>Released under the [MIT License](./LICENSE) · See the [changelog](./CHANGELOG.md) for release notes.</sub>
