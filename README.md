<div align="center">

<img src="https://raw.githubusercontent.com/AgentLayer1/vscode-cmux-open/main/assets/icon.png" alt="Open in cmux" width="128" height="128" />

# Open in cmux

**Right-click any folder in VS Code — open it as a [cmux](https://agentlayer.one) workspace.**

[![Marketplace](https://vsmarketplacebadges.dev/version-short/agentlayer.cmux-open-workspace.svg?style=flat-square&color=8B5CF6&label=marketplace)](https://marketplace.visualstudio.com/items?itemName=agentlayer.cmux-open-workspace)
[![Installs](https://vsmarketplacebadges.dev/installs-short/agentlayer.cmux-open-workspace.svg?style=flat-square&color=22D3EE&label=installs)](https://marketplace.visualstudio.com/items?itemName=agentlayer.cmux-open-workspace)
[![Platform](https://img.shields.io/badge/platform-macOS-10B981?style=flat-square&logo=apple&logoColor=white)](#requirements)
[![License](https://img.shields.io/badge/license-MIT-0B0B0F?style=flat-square)](./LICENSE)

</div>

---

## What it does

A one-click bridge from the VS Code Explorer into the [cmux](https://agentlayer.one) desktop app. No shell helpers, no symlinks, no env vars — the extension hands the folder path to cmux through the macOS Service the app already registers.

<div align="center">

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

Built by **[AgentLayer](https://agentlayer.one)**. cmux is AgentLayer's terminal-native agent workspace.

<sub>Released under the [MIT License](./LICENSE) · See the [changelog](./CHANGELOG.md) for release notes.</sub>
