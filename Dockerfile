
# Use a base image with Node.js and Ubuntu
FROM node:latest

# Install necessary dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg2 unzip \
    && apt-get install -y libgconf-2-4 # Required for running Chrome

# Install Chrome
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
#     && apt-get update \
#     && apt-get install -y google-chrome-stable
#
# # Set environment variables
# ENV CHROME_BIN=/usr/bin/google-chrome
# ENV CHROME_PATH=/usr/lib/google-chrome
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Install ChromeDriver
RUN wget -q -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/LATEST_RELEASE && \
    unzip /tmp/chromedriver.zip -d /usr/bin && \
    chmod +x /usr/bin/chromedriver
# Create a directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Expose the port your Express server is running on
EXPOSE 3000

# Start the Express server
CMD ["npm","run", "start"]
