---
layout: post
title: Arch Linux 入門指南
---

折騰 Linux 很有趣，讓筆者對 Linux 和 Shell 的態度由最初的不得不用變為現在的依賴；更重要的，調教出一個足夠順手的工作站對一個程式設計師的工作效率的提升有巨大的幫助。在筆者折騰 Linux 的六年曆史裡，Ubuntu、Fedora、Cent OS 都玩過，我起初認為發行版並不重要，只是包管理器命令的差異、包版本新舊的差異而已；而用了 Arch Linux 後再也沒有換過，甚至在樹莓派上也用 Arch Linux。迄今三年 Arch Linux 的表現仍讓我滿意。

有朋友在我的慫恿下安裝 Arch Linux，可是官網教程上幾千字的新手指南和幾千字的安裝教程就嚇走了一半人，剩下的一半人艱難地跟著官方指南安裝，結果不是連不上 wifi，就是啟動不了 X Window System。誠然使用 Arch Linux 需要很大的學習成本，但在筆者看來，學習過程中的困難是每個熟練的 Linux 使用者必須經歷的，也是值得每個程式設計師嘗試的。Arch Linux 就像 Linux 發行版中的雙節棍，在新手手中會傷到自己，在高手的手裡能展現最大的威力。

鑑於官方文件雖然詳盡但對新手並不友好，本文的目的是幫助有 Linux 使用經驗的人從 Ubuntu、Fedora 等「傻瓜型」發行版切換到 Arch Linux。

## 為什麼用 Arch Linux？

有人說用什麼作業系統並不重要，只要能寫出好程式碼就是好程式設計師。誠然，從一個高難度的工具裡尋找虛榮心是很愚蠢的。但當我在 Cygwin 裡手動 make 軟體包時，我會想念 Arch Linux 裡一行命令的暢快；當我幫別人給 Ubuntu 找私有更新源時，我會想念 Arch Linux 裡超全的倉庫帶來的整潔感。Arch Linux 雖然難以學習，但熟練掌握了所有常用功能後，Arch Linux 會成為一個很方便的工具。

### 為什麼不用 Windows？

程式設計師嚴重依賴各種命令列工具，所以一個 Unix Shell 在他們的工作生活裡是十分必要的。他們會選擇 Linux 發行版、BSD、或者 Mac OS X。雖然微軟公司在 2013 年推出了 PowerShell 以取代飽受詬病的 Windows 命令提示符，但由於缺乏第三方工具的支援，已難以挽回 Unix 程式設計師的市場。

有一些非程式設計師也用 Linux，因為：

1. 不懂 Shell 命令的使用者也能用 Ubuntu 等新手友好的發行版；
1. 不會有一個日漸臃腫的 C 盤；
1. 啟動速度不會隨著 C 盤變臃腫而變慢。

但阻止普通使用者使用 Linux 的原因有：

1. 習慣了 Windows，使用 Linux 需要學習；
1. 某些小眾軟體、某些專業領域的軟體（如建築、土木、音樂）、許多隻對中國市場釋出的軟體（如炒股軟體、網上銀行）不提供 Linux 版本；
1. 硬體廠商不提供適用於 Linux 的驅動程式，尤其導致 AMD 顯示卡發熱嚴重。

### 為什麼不用 RHEL、Debian、Oracle Linux

因為它們是面向伺服器的發行版，不適合個人工作站使用。

### 為什麼不用 Ubuntu、Fedora

對新手來說，這二者是最佳的選擇。但存在以下問題：

1. 官方軟體倉庫或不包含非自由軟體、或版本過舊，導致需要為許多常用軟體（如 Google Chrome）手動新增非官方更新源；
1. 發行版釋出重大更新時需要重灌、重配作業系統。

### 為什麼不用 LFS、Gentoo？

就使用難度來看，LFS > Gentoo > Slackware > Arch Linux。難度越高，使用者對作業系統的控制越靈活。筆者認為應當熟練使用 Arch Linux 後再考慮這幾個發行版。Slackware 要求使用者手動處理包依賴；Gentoo 要求使用者編譯所有的軟體包而不是直接下載可執行的二進製程式；LFS 更是要求使用者從核心到包編譯整個 Linux，這導致這幾個發行版在日常使用中不便。

### 為什麼不用 Mac OS X

~~因為買不起。~~

### Arch Linux 的優缺點

以下所述 Arch Linux 的特點，既是優點，也是缺點。它們都體現了 Arch Linux 明確的使用者定位：只適合足夠熟練的使用者。

#### 軟體版本新

通常在上游軟體釋出正式版後，各發行版會在分別在自己的平臺上做測試，確認穩定後再加入官方倉庫。但由於維護人員的缺乏，且軟體包數量龐大，發行版官方倉庫裡的軟體通常是一年前的版本。

而 Arch Linux 的機制是由官方維護者和「授信使用者」自己釋出軟體包更新。由於有一個非常活躍的使用者群，通常一旦上游軟體釋出正式版，幾天內就會出現在 Arch Linux 的官方倉庫中。但偶爾上游軟體的正式版會有 bug，bug 會隨之進入 Arch Linux 的倉庫。

#### 滾動更新

其他發行版定期釋出新版本，使用者需要隨之重灌系統才能保持系統最新。這是因為包管理器無法更新較底層的模組。

Arch Linux 採用滾動升級策略，一次安裝後可以持續升級並一直保持最新。有時更新需要使用者手動更改底層的部署和配置（例如服務管理系統、啟動載入器）。如果使用者在必要時沒有遵照官方新聞手動維護，可能導致作業系統啟動失敗。

#### 簡潔優雅

Arch Linux 的設計哲學認為，其他發行版過分追求「使用者友好」使得使用者離核心太遠，從而使用者難以定製、裁剪自己的作業系統。

Arch Linux 等於一個 Linux 核心加上一個好用的包管理器 Pacman。因此自動化程度很低，所有維護都需要使用者用命令和指令碼完成。

## 給新手的安裝建議

新手應遵照 <a href="https://wiki.archlinux.org/index.php/Installation_guide" target="_blank">官方 wiki</a> 安裝 Arch Linux 時會遇到一些問題。

### 硬碟分區與檔案系統

對於新手，建議使用 cgdisk 建立 GUID 分區表，可以最大程度地降低對命令的使用。

檔案系統建議使用 Btrfs。

### 連線到網際網路

對於虛擬機器，或者帶有 DHCP 的乙太網，網路已經連上了。對於無線網，運行 `wifi-menu`。靜態 IP 的乙太網配置較複雜，詳見 <a href="https://wiki.archlinux.org/index.php/Netctl" target="_blank">Netctl</a>。

### 選擇映象

編輯檔案 `/etc/pacman.d/mirrorlist`。使用離你的網路最近的映象。例如，華中地區教育網使用者應選擇華中科技大學的映象。

```
Server = http://mirrors.hust.edu.cn/archlinux/$repo/os/$arch
```

非教育網使用者通常可選擇網易的映象。

```
Server = http://mirrors.163.com/archlinux/$repo/os/i686
```

### 安裝軟體包

官方 wiki 使用此命令安裝 base 包組：

```
# pacstrap /mnt base
```

筆者建議安裝更多包：

```
# pacstrap /mnt base base-devel syslinux grml-zsh-config gnome-shell xorg-server xorg-xinit
```

其中 `base-devel` 是常用底層開發工具分組；`syslinux` 是啟動載入器；`grml-zsh-config` 提供一個十分友好的 Shell 介面；`gnome-shell` 是圖形介面；`xorg-server` 和 `xorg-xinit` 是圖形介面的底層服務。

還需要根據顯示卡廠商安裝顯示卡驅動：Nvidia 卡安裝 `xf86-video-nouveau`；AMD 卡安裝 `xf86-video-ati`；Intel 卡安裝 `xf86-video-intel`；虛擬機器和其他顯示卡安裝 `xf86-video-vesa`。例如虛擬機器中運行：

```
# pacstrap /mnt xf86-video-vesa
```

另外可以根據需要安裝更多包，例如編輯器 `emacs` 或 `vim`、漢字字型 `wqy-zenhei`、圖示主題 `faenza-icon-theme`、圖形介面主題 `numix-themes`、瀏覽器 `firefox`、終端模擬器 `gnome-terminal`。

### 配置啟動載入器

自動配置 Syslinux：

```
# syslinux-install_update -i -a
```

編輯配置檔案 `/boot/syslinux/syslinux.cfg`。將 `LABEL arch` 和 `LABEL archfallback` 兩行下的 `APPEND root=/dev/sda2 rw` 中的 `sda2` 分別改為 `sda1`。
