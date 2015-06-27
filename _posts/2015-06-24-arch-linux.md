---
layout: post
title: Arch Linux 入門指南
---

折騰 Linux 不僅很有趣，於程序員而言，調教出一個足夠順手的工作站對一個程序員的工作效率的提升有巨大的幫助。在筆者折騰 Linux 的六年曆史裡，Ubuntu、Fedora、Cent OS、OpenSUSE 如過眼雲煙；而用了 Arch Linux 後我再也沒有換過，甚至在 Raspberry Pi 上也用 Arch Linux。迄今為止 Arch Linux 的表現仍讓我滿意。

有朋友在我的慫恿下安裝 Arch Linux，可是官方 wiki 上幾千字的新手指南和幾千字的安裝教程就嚇走了一半人，剩下的一半人艱難地跟著官方 wiki 安裝，結果不是連不上 wifi，就是啟動不了 X Window System。使用 Arch Linux 需要很大的學習成本，但學習過程中的困難是每個熟練的 Linux 用戶必須經歷的，也是值得每個程序員嘗試的。Arch Linux 就像 Linux 發行版中的雙節棍，難以為新手所駕馭，只在高手的手裡展現最大的威力。

鑑於官方文檔雖然詳盡但對新手並不友好，本文的目的是幫助有 Linux 使用經驗的人從 Ubuntu、Fedora 等「傻瓜型」發行版切換到 Arch Linux。

## 為什麼用 Arch Linux？

我起初認為發行版並不重要，只是包管理器命令的差異、軟件版本新舊的差異而已。有人說用什麼操作系統並不重要，只要能寫出好代碼就是好程序員。誠然，從工具裡尋找虛榮心是很愚蠢的。但當我在 Cygwin 裡手動 make 軟件包時，我會想念 Arch Linux 裡一行命令的暢快感；當我幫別人給 Ubuntu 找私有軟件源時，我會想念 Arch Linux 裡超全的软件倉庫帶來的整潔感。Arch Linux 雖然難以學習，但熟練掌握了常用功能後，Arch Linux 會成為一個很方便的工具。

### 為什麼不用 Windows？

許多程序員重度依賴命令行工具，一個 Unix Shell 在他們的工作生活中是十分必要的。他們會選擇 Linux 發行版、BSD、或者 Mac OS X。雖然 Windows 裡有一個 PowerShell，但這個姍姍來遲的 shell 已難以挽回 Unix 程序員的青睞。

[有一些非程序員用戶也用 Linux](http://www.reddit.com/r/linux/comments/2sm5yk/more_and_more_people_at_my_uni_are_running_linux/){:target="_blank"}，因為：

1. 不懂 Shell 命令的用戶也能用 Ubuntu 等新手友好的發行版；
1. 不會有一個日漸臃腫的 C 盤；
1. 啟動速度不會隨著 C 盤變臃腫而變慢。

但阻止普通用戶使用 Linux 的原因有：

1. 習慣了 Windows，使用 Linux 需要學習；
1. 某些小眾軟件、某些專業領域的軟件（如建築、土木、音樂）、許多隻對中國市場發佈的軟件（如炒股軟件、網上銀行）不提供 Linux 版本；
1. 硬件廠商不提供適用於 Linux 的驅動程序，尤其導致 AMD 顯卡發熱嚴重。

### 為什麼不用 RHEL、Debian、Oracle Linux

因為它們是面向服務器的發行版，不適合個人工作站使用。

### 為什麼不用 Ubuntu、Fedora

對新手來說，這二者是最佳的選擇。但存在以下問題：

1. 官方軟件倉庫或不包含非自由軟件、或版本過舊，導致需要為許多常用軟件（如 Google Chrome）手動添加非官方軟件源；
1. 發行版發佈新版本時需要重裝整個操作系統才能保持最新。

### 為什麼不用 LFS、Gentoo、Slackware？

就使用難度來看，LFS > Gentoo > Slackware > Arch Linux。難度越高，用戶對操作系統的控制越靈活。但是：Slackware 要求用戶手動處理包依賴；Gentoo 要求用戶編譯所有的軟件包而不是直接下載可執行的二進製程序；LFS 更是要求用戶編譯整個內核。因此，筆者認為這幾個發行版不便於日常使用。

### Arch Linux 的優缺點

下述 Arch Linux 之特點，都體現了 Arch Linux 明確的用戶定位：只適合足夠熟練的用戶。

#### 軟件版本新

Arch Linux 方便使用新版本軟件的同時；要求用戶手動處理新版本中偶爾出現的 bug。

通常在上游軟件發佈正式版後，各發行版會在分別在自己的平臺上做測試，確認穩定後再加入官方倉庫。而由於維護人員的缺乏，且軟件包數量龐大，發行版官方倉庫裡的軟件通常是半年前的版本。

而 Arch Linux 的機制是由官方維護者和「授信用戶」自己發佈軟件包更新。由於有一個非常活躍的用戶群，通常一旦上游軟件發佈正式版，幾天內就會出現在 Arch Linux 的官方倉庫中。但偶爾上游軟件會有 bug，bug 會隨之進入 Arch Linux 的倉庫。這種情況需要用戶手動回滾舊版本。

#### 滾動更新

只要維護得當，用戶永遠不需要重裝系統；但當 Arch Linux 偶爾有重大更新時，用戶需要遵照官方的指導手動維護系統。

其他發行版定期發佈新版本，用戶需要隨之重裝系統才能保持系統最新。這是因為包管理器無法更新較底層的模塊。

Arch Linux 採用滾動升級策略，一次安裝後可以持續升級並一直保持最新。當新版本變動了較底層的模塊，需要用戶手動更改底層的部署和配置（例如服務管理系統 Systemd、啟動加載器 Syslinux）。如果用戶在必要時沒有遵照官方的指導手動維護，可能導致操作系統啟動失敗。

#### 簡潔優雅

Arch Linux 的設計哲學認為，其他發行版過分追求「用戶友好」使得用戶離核心太遠，從而用戶難以定製、裁剪自己的操作系統。

Arch Linux 等於一個 Linux 內核加上一個好用的包管理器 Pacman。因此自動化程度很低，所有維護都需要用戶用命令和腳本完成。

## 安裝技巧

不同於其他發行版的嚮導式、圖形化的安裝方式，Arch Linux 需要用戶從另一個 Linux（通常是光盤或閃存上的 Arch Linux）用一條條命令搭建。無論是新手還是熟練用戶，都須遵照<a href="https://wiki.archlinux.org/index.php/Installation_guide" target="_blank">這個官方 wiki 頁面</a>安裝 Arch Linux。本節是給新手的在安裝時的一些建議。

### 硬盤分區與文件系統

對於新手，建議使用 cgdisk 建立 GUID 分區表，可以最大程度地減少使用命令。

文件系統建議使用 Btrfs。

### 連接到互聯網

對於虛擬機，或者帶有 DHCP 的以太網，網絡不需要手動配置。對於無線網絡，運行 `wifi-menu`。靜態 IP 的以太網配置較複雜，詳見 <a href="https://wiki.archlinux.org/index.php/Netctl" target="_blank">Netctl</a>。

### 選擇鏡像

編輯文件 `/etc/pacman.d/mirrorlist`。使用離你的網絡最近的鏡像。例如，華中地區教育網用戶應選擇華中科技大學的鏡像。

```
Server = http://mirrors.hust.edu.cn/archlinux/$repo/os/$arch
```

非教育網用戶通常可選擇網易的鏡像。

```
Server = http://mirrors.163.com/archlinux/$repo/os/i686
```

### 安裝軟件包

官方 wiki 使用此命令安裝 base 包組：

```
# pacstrap /mnt base
```

筆者建議安裝更多包：

```
# pacstrap /mnt base base-devel syslinux grml-zsh-config gnome-shell xorg-server xorg-xinit
```

其中 `base-devel` 是常用底層開發工具分組；`syslinux` 是啟動加載器；`grml-zsh-config` 提供一個十分友好的 Shell 接口；`gnome-shell` 是圖形接口；`xorg-server` 和 `xorg-xinit` 是圖形界面的底層服務。

還需要根據顯卡廠商安裝顯卡驅動：Nvidia 卡安裝 `xf86-video-nouveau`；AMD 卡安裝 `xf86-video-ati`；Intel 卡安裝 `xf86-video-intel`；虛擬機和其他顯卡安裝 `xf86-video-vesa`。例如虛擬機中應運行：

```
# pacstrap /mnt xf86-video-vesa
```

另外可以根據需要安裝更多包，例如編輯器 `emacs` 或 `vim`、漢字字體 `wqy-zenhei`、瀏覽器 `firefox`、終端模擬器 `gnome-terminal`。

### 配置啟動加載器

自動配置 Syslinux：

```
# syslinux-install_update -i -a
```

編輯配置文件 `/boot/syslinux/syslinux.cfg`。將 `LABEL arch` 和 `LABEL archfallback` 兩行下的 `APPEND root=/dev/sda2 rw` 中的 `sda2` 分別改為 `sda1`。

## 包管理器

Pacman 包管理器是 Arch Linux 中最獨特的組件。其特點是能以統一的風格管理官方倉庫的軟件包和用戶自己創建的軟件包。

Arch 用戶軟件倉庫（AUR）是由用戶自己創建、維護的軟件倉庫。

Yaourt 是 Arch 用戶社區貢獻的一個 Pacman 外殼。它能統一地處理官方倉庫裡的和 AUR 裡的軟件包。

這種管理軟件包的方式非常易用：

1. __方便__

    在 Ubuntu 中，安裝 Google Chrome 需要：

    1. 將 Google 的 SSH 公鑰添加到 APT 中：

        ```
        $ wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
        ```

    1. 添加 Google 的軟件源：

        ```
        $ sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
        ```

    1. 安裝 Google Chrome：

        ```
        $ sudo apt-get update
        ```

        ```
        $ sudo apt-get install google-chrome-stable
        ```

    而在一個安裝有 Yaourt 的 Arch Linux 中，安裝 Google Chrome 只需一行命令：
    ```
    $ yaourt -S google-chrome
    ```

1. __軟件包全__

    其他發行版都存在的一個缺陷：軟件包不夠全。或者說，對於非自由軟件、非大眾化軟件，用戶必須從非官方途徑的獲取資源，甚至需要手動 make。而在 AUR 的五萬多個軟件包中，包含許多非自由的（如 Google Chrome）、小眾的（如 Emscripten）軟件。

1. __軟件包新__

    相比其他發行版軟件倉庫中緩慢的更新週期，Arch Linux 官方倉庫和 AUR 中熱門的軟件包相對上游軟件的更新遲滯通常不超過一天。

### 使用技巧

初學者應從[官方 wiki 中的 Pacman 詞條](https://wiki.archlinux.org/index.php/Pacman)學習 Pacman 的使用技巧。

下面介紹筆者最常用的一條技巧。

下述命令的作用為：輸出所有由用戶安裝的且不屬於 base 和 base-devel 包組的軟件包。

```shell
comm -3 <(yaourt -Qg base base-devel | sort | uniq) <(yaourt -Qe | sort) | sed -r 's/^.//'
```
這條命令的原理此處不便展開。此命令方便用戶保持 Linux 的整潔。由於此組合命令較常用，故筆者在 `.zshrc` 中將其映射為一條較短的命令：

```shell
alias pkgleaves="comm -3 <(yaourt -Qg base base-devel | sort | uniq) <(yaourt -Qe | sort) | sed -r 's/^.//' | less"
```
