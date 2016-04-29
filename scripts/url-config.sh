#!/bin/bash
GHOST_URL=http://ghost.org
OPENSHIFT_CONSOLE=http://10.2.2.2:8443
COCHERA_URL=$COCHERA_SERVICE_HOST:$COCHERA_SERVICE_PORT
curl -X PUT "$COCHERA_URL/urls?name=ghost&url=$GHOST_URL"
curl -X PUT "$COCHERA_URL/urls?name=openshift&url=$OPENSHIFT_CONSOLE"
