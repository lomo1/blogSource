FROM centos:7

LABEL maintainer="lomo"
LABEL node_version="v12.22.12"
LABEL npm_version="6.14.16"
LABEL gulp_version="2.3.0"
LABEL blog="lomo.space"
LABEL description="github pages for lomo.space build environment."

RUN curl --silent --location https://rpm.nodesource.com/setup_12.x | bash - \
  && yum install -y nodejs

RUN yum -y install wget && yum -y install unzip && yum -y install vim && yum -y install git  && yum install -y gcc make \
  && npm install gulp-cli -g && npm install gulp -g && npm install hexo -g
  # && yum -y install centos-release-scl-rh \ 
#   && yum-config-manager --enable rhel-server-rhscl-7-rpms \ 
  # && yum -y install rh-nodejs12 &&  scl enable rh-nodejs12 bash \ 
#   && npm install gulp-cli -g && npm install gulp -g && npm install hexo -g

# ADD /Users/lomo/Documents/codes/blogSource/* /opt/blogSource
#设置时区
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone

WORKDIR /opt

ENV LC_ALL="en_US.UTF-8" LANG="zh_CN.GBK"

# refer: https://www.softwarecollections.org/en/scls/jstanek/rh-nodejs12/