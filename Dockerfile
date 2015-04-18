FROM ubuntu

RUN apt-get install -y curl
CMD curl https://install.meteor.com/ | sh
CMD mkdir expenses/
ADD . expenses/
ENV MONGO_URL=mongodb://192.168.99.100:49155
CMD cd expenses && meteor
