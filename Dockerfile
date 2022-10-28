FROM node:18-alpine as builder

WORKDIR /opt/build
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:18-alpine as runner

WORKDIR /opt/qbit-scripts
COPY --from=builder /opt/build/package.json /opt/build/yarn.lock ./
COPY --from=builder /opt/build/dist ./dist
COPY --from=builder /opt/build/node_modules ./node_modules
COPY --from=builder /opt/build/bin ./bin

ENTRYPOINT ["/opt/qbit-scripts/bin/run"]
