# Team Tiburon API 

## Requirements

[Node](https://nodejs.org/en/download/) - Tested on v8.11.3

[npm](https://www.npmjs.com/package/npm) - (Bundled with Node) Tested on v6.1.0

[Bash](https://www.gnu.org/software/bash/)

    * [Windows via Git for Windows](http://gitforwindows.org/)

    * OSX & (Most) Linux users should already have Bash

### Optional

[git](https://git-scm.com/downloads) - Alternatively, download a zip of this GitHub repo.

[Docker](https://docs.docker.com/installation/)(Optional, if you would like to run the example in Docker)

## Local Setup

`git clone https://github.com/TeamTiburon/tiburon-api.git`

Create a `.env`

```
HOST=localhost
PORT=8080

TWILIO_ACCOUNT_SID=XXXX
TWILIO_API_KEY=XXXX
TWILIO_API_SECRET=XXXX
```

`npm install`

`npm run start`

## Cloud Setup

Create instance:

```bash
gcloud compute instances create tiburon-api \
    --image-family=debian-9 \
    --image-project=debian-cloud \
    --machine-type=g1-small \
    --scopes userinfo-email,cloud-platform \
    --metadata-from-file startup-script=startup-script.sh \
    --zone us-central1-f \
    --tags http-server,websocket
```

Setup firewall rules:

```bash
gcloud compute firewall-rules create default-allow-http-8080 \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0 \
    --target-tags http-server \
    --description "Allow port 8080 access to http-server"
    
gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:65080 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 65080"
```

## Cloud "Deployment"

SSH into cloud compute:

`gcloud compute --project "team-tiburon" ssh --zone "us-central1-f" "tiburon-api"`

`cd opt/app/tiburon-api`

`npm run refresh`
