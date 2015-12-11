#!/bin/bash
DEST="/usr/share/nginx/html"
SRC="/home/ec2-user/joeyrideout.github.io"
rm -rf $DEST/*
cp -r $SRC/* $DEST/
sudo service nginx restart
