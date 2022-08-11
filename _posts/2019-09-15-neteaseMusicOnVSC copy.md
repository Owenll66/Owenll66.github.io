---
layout: blog

title: Playing music on Visual Studio Code - A Free music plugin

description: This blog will introduce the steps to install Netease Music plugin to VSC

author: owenll66
---

# Playing music on Visual Studio Code - A Free music plugin

## Here are the steps to install NeteaseMusic plugin

## Step One: Download and install the latest version of VSC

Download Visual Studio Code on https://code.visualstudio.com/download

## Step Two: Download NeteaseMusic plugin on VSC

![neteasePlugin](/assets/blog-neteaseMusicOnVSC/neteasePlugin.jpg)

## Step Three: Replace "ffmpeg.dll" under VSC directory

For Windows:  

[Download ffmpeg.dll](/assets/blog-neteaseMusicOnVSC/ffmpeg.dll){:.btn}  
Replace: /ffmpeg.dll

For MacOS:  

[Download libffmpeg.dylib](/assets/blog-neteaseMusicOnVSC/libffmpeg.dylib){:.btn}  
Replace: /Contents/Frameworks/Electron\ Framework.framework/Libraries/libffmpeg.dylib
## Step Four: Get Started

### Usage

Press <kbd>F1</kbd> or <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd> to open command board

Enter `NeteaseMusic` to start exploring :D

### Hotkey

| Command     --| Key                         |
| ----------- --| --------------------------- |
| Mute / unMute | <kbd>Alt</kbd> <kbd>M</kbd> |
| Last Song     | <kbd>Alt</kbd> <kbd>,</kbd> |
| Next Song     | <kbd>Alt</kbd> <kbd>.</kbd> |
| Play / Pause  | <kbd>Alt</kbd> <kbd>/</kbd> |

## Extension Setting

* `NeteaseMusic.API.SSL`: enable / disable HTTPS API
* `NeteaseMusic.SSL.strict`: enable / disable SSL certificate checking
* `NeteaseMusic.CDN.redirect`: enable / disable CDN redirection

Source: https://github.com/nondanee/vsc-netease-music  

<br> 

***
