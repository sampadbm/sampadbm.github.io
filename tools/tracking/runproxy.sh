#rackup -p 9999 --host 0.0.0.0
thin start -p 9999 --ssl --ssl-key-file /home/sampad/ee250website/setup/certs/ee250io.tk/privkey.pem --ssl-cert-file /home/sampad/ee250website/setup/certs/ee250io.tk/fullchain.pem

