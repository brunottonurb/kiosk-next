# Kiosk App

A simple app that should display some useful information on the 7" raspberry pi touch screen.

![screenshot](https://github.com/brunottonurb/kiosk-next/blob/main/screenshot.jpg?raw=true)

## Features

- [x] Display current time
- [x] Display current weather
- [x] Display current air quality
- [x] Display devices on the network
- [x] BVG departures board
- [ ] Offer controls for Sonos devices
- [ ] Buttons for Google Home commands

## Setup

### Install dependencies

```bash
npm install
```

### Weather widget

You need an openweathermap API key and your coordinates. Add them the .env.local file. The variables are: OWM_KEY, LAT, LON. See https://openweathermap.org/current for more information.
```bash
echo "OWM_KEY=<yourkey>" > .env.local
echo "LAT=<yourlat>" >> .env.local
echo "LON=<yourlon>" >> .env.local
```

### Air quality widget

Uses the same env variables as the weather widget. See https://openweathermap.org/api/air-pollution for more information.

<!-- For the TRÅDFRI integration you can add the gateway ip, but autodiscovery should also work
```bash
echo "TRADFRI_GATEWAY_IP=<yourgatewayip>" >> .env.local
```
Then set either the TRADFRI_SECURITY_CODE or TRADFRI_IDENTITY and TRADFRI_PSK variables.
```bash
echo "TRADFRI_SECURITY_CODE=<yoursecuritycode>" >> .env.local
echo "TRADFRI_IDENTITY=<youridentity>" >> .env.local
echo "TRADFRI_PSK=<yourpsk>" >> .env.local
``` -->
### Network scan widget

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

### BVG departures widget

Add the stop id and an optional label to the .env.local file. See https://v5.bvg.transport.rest/ for more information.
```bash
echo "BVG_STOP_ID=<yourstopid>" >> .env.local
echo "BVG_STOP_LABEL=<yourstoplabel>" >> .env.local
```

## Run the app

```bash
npm run build && npm run start
```

Visit http://localhost:3000 to see the app.
