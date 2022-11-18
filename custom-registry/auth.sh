mkdir auth
 docker run \
  --entrypoint htpasswd \
  httpd:2 -Bbn demo Demo1234# > auth/htpasswd
