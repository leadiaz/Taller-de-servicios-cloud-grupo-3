FROM node:8
# Utiliza la imagen de node 8 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/my_node_app

# Copia el package.json package-lock.json en /home/node/my_node_app
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 5000 donde corre la aplicación
EXPOSE 5000

# Copia los fuentes dentro del container
COPY UNQfy /home/node/my_node_app/UNQfy
COPY Notification /home/node/my_node_app/Notification
COPY Loggly /home/node/my_node_app/Loggly
COPY ./*.js /home/node/my_node_app/
COPY ./*.json /home/node/my_node_app/
COPY Monitor /home/node/my_node_app/Monitor

# Crea un directorio donde se van a guardar datos de la aplicación
#RUN mkdir -p /home/node/my_node_app/app_data
VOLUME ["/home/node/my_node_app"]

# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
#CMD [ "node", "UNQfy/service" ]
#CMD [ "node", "Notification/router-notificator" ]
#CMD [ "node", "Loggly/ApiLoggly" ]
CMD [ "node", "Monitor/MonitorApi" ]

# LISTO!


# Para construir la imagen
# docker build -t <nombre_de_la_imagen> .

# Para correr el container
# docker run -p 5000:5000 -v $(pwd):/home/node/my_node_app/ --name <nombre_container> --user node <nombre_de_la_imagen>