#!/bin/bash
GHOST_URL=http://ghost.org
OPENSHIFT_CONSOLE=http://10.2.2.2:8443
curl -X PUT "$COCHERA_PORT_8080_TCP/urls?name=ghost&url=$GHOST_URL"
curl -X PUT "$COCHERA_PORT_8080_TCP/urls?name=openshift&url=$OPENSHIFT_CONSOLE"
