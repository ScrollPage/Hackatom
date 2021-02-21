FROM nginx

# RUN apt-get update -y
# RUN apt-get upgrade -y
# RUN apt-get install -y build-essential
# RUN apt-get install -y libpcre3 libpcre3-dev libssl-dev zlib1g-dev

# # ENV APP_HOME=/etc/nginx
# # WORKDIR $APP_HOME

# RUN whereis configure

# RUN ./configure --error-log-path=/var/log/nginx/error.log \
#     --http-log-path=/var/log/nginx/access.log --with-pcre --with_http_ssl_module

# RUN make
# RUN make install

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/cache
COPY nginx.conf /etc/nginx/conf.d