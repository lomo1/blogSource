---
title: Linux and BSD difference
date: 2014-06-13 12:54:04
tags: [Linux, BSD, Darwin]
categories: read
---

## Linux 与BSD关系 区别

Linux 是只是一个内核。制作 Linux 发行版所要做的工作就是，汇集那些创建一个完整 Linux 操作系统所需的所有软件，将它组合成一个像 Ubuntu、Mint、Debian、RedHat 或者是 Arch 这样的 Linux 发行版。有许多不同的 Linux 发行版。

与此相反的是，BSD 这个名字则代表其内核和操作系统。例如，FreeBSD 提供了 FreeBSD 内核和 FreeBSD 操作系统。它是作为一个单一的项目维护的。换句话说，如果你想要安装 FreeBSD，就只有一个 FreeBSD 可供你安装。如果你想要安装 Linux，你首先需要在许多 Linux 发行版之间选择。

许可证是典型的差异，虽然它不会对大多数人产生影响。Linux 使用 GNU 通用公共许可证，即 GPL。如果你修改了 Linux 内核，并将其分发，你就必须放出您的修改的源代码。

BSD 使用 BSD 许可证。如果你修改了 BSD 内核或发行版，并且发布它，你根本不需要必须发布其源代码。你可以自由地对你的 BSD 代码做任何你想做的事情，你没有义务发布的你修改的源代码，当然你想发布也行。

以下是通常认可的三个“主流” BSD 操作系统：
• FreeBSD: FreeBSD 是最受欢迎的 BSD，针对高性能和易用性。它支持英特尔和 AMD 的32位和64位处理器。
• NetBSD: NetBSD 被设计运行在几乎任何架构上，支持更多的体系结构。在他们的主页上的格言是"理所当然，我们运行在 NetBSD 上"。
• OpenBSD:OpenBSD 为最大化的安全性设计的 —— 这不仅仅它宣称的功能，在实践中也确实如此。它是为银行和其他重要机构的关键系统设计的。

还有两个其他的重要 BSD 操作系统：
• DragonFly BSD: DragonFly BSD 的设计目标是提供一个运行在多线程环境中的操作系统 —— 例如，计算机集群。
• Darwin / Mac OS X: Mac OS X 实际上基于 Darwin 操作系统，而 Darwin 系统基于 BSD。它与其他的 BSD 有点不同，虽然底层内核和其他的软件是开源代码(BSD 代码)，但操作系统的大部分是闭源的 Mac OS 代码)。苹果在 BSD 基础上开发了 Mac OS X 和 iOS，这样他们就不必写操作系统底层，就像 谷歌在 Linux 基础上开发 android 系统一样。

如果你是一个 PC 桌面用户，你真的不需要太过在意 BSD。你可能会喜欢 Linux，因为它具有更先进的硬件支持，更容易安装，具有现代操作系统的特点。如果你关注服务器或嵌入式的设备，你可能会更喜欢 FreeBSD。
