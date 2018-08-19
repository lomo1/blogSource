---
title: general git command
date: 2016-06-17 20:56:38
tags: git
categories: study
description: git常用命令
---

## Git常用命令[笔记]

### 准备 -- 秘钥

1. 生成秘钥(公钥、私钥)

`ssh-keygen -t rsa -b 4096 -C "注册的email"`

2. copy共钥

`pbcopy < ~/.ssh/id_rsa.pub`

### 常用命令

①git init (项目目录下初始化)

②git add .(add当前目录所有文件并追踪其变更与否)

③git commit -m "变更描述"

④git push -u origin master (一般地: 远程地址默认 origin 与 分支master，实际开发默认分支为develop  )

⑤git status (查看本地有哪些文件变更: 修改、删除、增加等变化)

⑥git diff xxxx.xx（具体的文件，对比文件内容变化）

⑦git  remote add origin git@xxx/xxx/xxx.git (添加远程仓库地址到本地记录，并简称为origin)

⑧git stash    //备份当前的工作区的内容

⑨git stash pop  //从Git栈中读取最近一次保存的内容，恢复工作区的相关内容


### Git基本配置相关
```bash
git config --list

git config --global user.name "xxx"
git config --global user.email "lomo@lomo.space"
# user name 和 email 信息会显示在提交历史的提交者信息上

git config --global color.ui true

git config --global color.status auto

git config --global color.branch auto

```

### 其它

```bash
git branch -r  #远程分支

git branch -a  #所有分支

git checkout newbranch origin/master  
#//在origin/master的基础上，创建一个新分支

$ git merge origin/master
# 或者
$ git rebase origin/master
#使用git merge命令或者git rebase命令，在本地分支上合并远程分支

git remote rename oldname newname
#修改远程仓库地址别名
```


### 撤销相关

    git add 后撤销：
	git reset HEAD filename

	撤销所有的add:
		git reset HEAD .
    git commit 后撤销本次commit：
	git log
	git reset --soft commit_id(本次提交前的那次id)
		
    git push 后 撤销（回退）：
	git reset --hard <版本号>   
	 // 注意使用 --hard 参数会抛弃当前工作区的修改, 
	 // --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交

	git reset --soft f7b385a   //(本次提交的上一次提交的版本号)
    git push lomo develop --force   //覆盖掉远端的版本信息，使远端的仓库也回退到相应的版本


### 分支的创建与合并

	【create】
	创建并切换至新创建的分支：
		git checkout -b newbranchName
	只创建：
		git branch 分支名
	delete 分支
		git branch -d 分支名
	切换至某分支：
		git checkout 分支名
	
	【rebase/merge】
	将dev分支合并至master:
		git checkout master
		git merge dev
	  或
		git rebase dev
		
		区别：
			merge操作会生成一个新的节点，之前的提交分开显示；
			而rebase操作不会生成新的节点，是将两个分支融合成一个线性的提交，可以线性的看到每一次提交；
	合并时冲突：
		merge 操作遇到冲突的时候，当前merge不能继续进行下去。手动修改冲突内容后，add 修改，commit 就可以；
		
		而rebase 操作的话，会中断rebase,同时会提示去解决冲突。
        解决冲突后,将修改add后执行git rebase —continue继续操作，或者git rebase —skip忽略冲突。


### 实际使用总结

> 当多人协同开发一个项目时，一般不会直接在master分支直接开发，而是把master分支保留作为最终稳定、发行版本.

假设现在自己在本地develop分支开发了新功能、或者修改了老功能代码，现在需要提交，那么自己在提交之前，一定要按照如下顺序：

①git fetch origin （从远端中央仓库获取最新版本）

②如果本地有修改未提交，则会提示git stash, 之后再git stash pop出来本地修改即可.

③fetch完之后，在本地完成合并，`git rebase origin/分支名`, rebase的目的就是每次提交前都必须保证自己的本地仓库版本号必须要大于等于中央仓库版本号.

④git push xx, 合并后, stash里的该pop就pop，该add的add， 然后push到自己fork的远端仓库，然后向中央仓库发起Pull Request即可。

> 这样既保证了自己本地仓库和中央仓库版本一致性，也保证了自己远端仓库版本一致性(从自己fork那一刻起到自己首次进行代码提交，中央仓库可能有很多更新和push合并,而自己fork到自己远端的仓库并不会自动与中央仓库进行同步，所以自己远端仓库的版本号并不一定和中央仓库版本号一致)


#### 本地手动合并他人代码

> 假设拥有合并中央仓库代码权限!

①`git checkout -B/-b newTest origin/develop` (newTest:新的远端仓库别名，origin/develop:分支)

②如果本地有修改，需要`git stash`操作

③`git branch` 可以查看当前所在分支(默认第一步创建完后自动切换至最新的分支上去)

④`git pull --rebase git@github.com:xxxx.git develop` (拉取其他人的最新提交的分支develop代码 到本地刚才新建的分支上 同时进行合并操作，若其他人提交的这个版本比中央仓库的低，则会有冲突，需要手动解决冲突)

⑤本地手动完成合并后，再push上去，`git push origin newTest:develop`

> 将本地的newTest分支提交到远程仓库的develop分支, 
将本地的xx分支提交到远程的xxx分支语法，如上，用 : 链接2个分支; 
若 冒号：左边分支为空，则会删除远程分支，本地保留；
如：`git push origin :test `; //远程test分支会被删除


push完之后，本地gitk即可借助GUI的小界面工具查看提交.

⑤确认后，切换本地自己开发分支 `git checkout develop`; 然后`git rebase origin/develop` 将本地合并到自己的开发分支中

⑥最后，`git push lomo develop` (假设自己不是在中央仓库上直接开发的，而是重新fork 的，但是自己有合并代码的权限针对之前合并代码操作而言)，这一步是将本地最新版本(在合并完别人提交的代码到中央仓库后)push到自己fork的那个远端仓库，保持自己远端仓库版本和中央仓库版本号的一致性.