#!/bin/sh
npm run production
echo "1"
cd ./dist
echo "2"
jar -cvf test.war *
echo "3"
scp /Users/bytedance/workspace/react-redux-scaffold/dist/test.war root@106.15.93.13:/tomcat/webapps/
echo "4"
echo "success"