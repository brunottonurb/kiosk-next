# Kiosk App

A simple app that should display some useful information on the 7" raspberry pi touch screen.

## Features

- [x] Display current time
- [x] Display current weather
- [x] Display current air quality
- [x] Display devices on the network
- [ ] Offer controls for Sonos devices
- [ ] Buttons for Google Home commands

## Setup

You need an openweathermap API key and your coordinates. Add them the .env.local file. The variables are: OWM_KEY, LAT, LON.
```bash
echo "OWM_KEY=<yourkey>" > .env.local
echo "LAT=<yourlat>" >> .env.local
echo "LON=<yourlon>" >> .env.local
```

Your need to install nmap on the pi.
```bash
sudo apt install nmap
```

To run nmap as root, you need to add the following line to your sudoers file.
```bash
sudo visudo
```

Add the following line to the file.
```bash
pi ALL=(ALL) NOPASSWD: /usr/bin/nmap
```
