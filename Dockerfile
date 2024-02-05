FROM nginx:1.22.1

COPY --from=build /usr/app/.next /usr/share/nginx/html