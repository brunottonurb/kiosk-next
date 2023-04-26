# Kiosk App

A simple app that should display some useful information on the 7" raspberry pi touch screen.

![screenshot](https://github.com/brunottonurb/kiosk-next/blob/main/screenshot.jpg?raw=true)

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

For the TRÅDFRI integration you can add the gateway ip, but autodiscovery should also work
```bash
echo "TRADFRI_GATEWAY_IP=<yourgatewayip>" >> .env.local
```
Then set either the TRADFRI_SECURITY_CODE or TRADFRI_IDENTITY and TRADFRI_PSK variables.
```bash
echo "TRADFRI_SECURITY_CODE=<yoursecuritycode>" >> .env.local
echo "TRADFRI_IDENTITY=<youridentity>" >> .env.local
echo "TRADFRI_PSK=<yourpsk>" >> .env.local
```

Your need to install nmap on the pi for the network scan to work.
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
