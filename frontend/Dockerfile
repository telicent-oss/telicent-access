FROM telicent/telicent-nginx1.27:latest

WORKDIR /usr/share/nginx/html/access

COPY ./accessfrontend.sbom.json /opt/telicent/sbom/sbom.json
COPY ./build .
COPY nginx/nginx.conf /etc/nginx/conf.d/app.conf

# run
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]