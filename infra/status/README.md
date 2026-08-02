# Status check

Génère `/var/www/status-data/status.json`, lu par `thomasbasquin.fr/status`.

## Installation sur le serveur (une fois)

`/var/www` appartient à `thomas`, donc pas besoin de sudo pour le dossier de
sortie :

```bash
mkdir -p /var/www/status-data
```

Le reste (units systemd) nécessite root :

```bash
sudo ln -s /home/thomas/projects/thomas-homepage/infra/status/vps-status-check.service /etc/systemd/system/
sudo ln -s /home/thomas/projects/thomas-homepage/infra/status/vps-status-check.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now vps-status-check.timer
```

## Vérifier

```bash
sudo systemctl start vps-status-check.service   # forcer un run immédiat
cat /var/www/status-data/status.json
systemctl list-timers vps-status-check.timer
```

## Mettre à jour la liste des sites

Éditer le tableau `SITES` dans `check.sh`, puis relancer le service
(`sudo systemctl start vps-status-check.service`) — pas besoin de
réinstaller les units.
