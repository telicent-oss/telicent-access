FROM telicent/telicent-nodejs20:latest  
WORKDIR /app

USER root
RUN microdnf --setopt=tsflags=nodocs --setopt=install_weak_deps=0 --enablerepo=ubi-9-appstream-rpms install nmap-ncat -y
RUN microdnf clean all

USER 185
COPY ./access.sbom.json /opt/telicent/sbom/sbom.json
COPY wait-for.sh ./
COPY ./dist ./dist
COPY ./package.json ./package.json
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.22
ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
RUN LOCAL_MACHINE=false yarn install --frozen-lockfile --production && yarn cache clean

ENV PORT ${PORT}
EXPOSE ${PORT}
CMD ["node", "dist/index.js"]