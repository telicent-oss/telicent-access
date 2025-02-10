FROM telicent/telicent-nginx1.27:latest
USER 185
COPY ./accessfrontend.sbom.json /opt/telicent/sbom/sbom.json
COPY nginx/ /usr/local/nginx/conf/
COPY build/ /usr/local/nginx/html/

# run
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]