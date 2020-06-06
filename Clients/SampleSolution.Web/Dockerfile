FROM nginx:stable
EXPOSE 30202

RUN ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone
RUN rm -rvf /etc/nginx/conf.d/default.conf

COPY ${source:-samplesolutionwebnginx.conf} /etc/nginx/conf.d/samplesolutionwebnginx.conf
COPY ${source:-wwwroot} /usr/share/nginx/html
