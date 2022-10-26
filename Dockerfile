FROM node:17
WORKDIR /flurn
COPY . .
RUN npm install --location=global npm@8.19.2
RUN npm install 
RUN apt-get update || : && apt-get install apt-utils python3 python3-pip -y
RUN pip3 install -r requirements.txt
RUN python3 uploadToDB.py
EXPOSE 8080
CMD ["npm", "start"]