# Biblioteca de scripts @ricardoinvesting
Biblioteca de script do @ricardoinvesting

De uma passadinha no meu canal https://youtube.com/@ricardoinvesting ;)

![alt text](https://i.ibb.co/2d119LT/profile-rick-1.png)


# Script para concatenar arquivos
### IRPF
```
cat ./irpf_to_pdf/vars.js ./irpf_to_pdf/utils.js ./irpf_to_pdf/server.js ./irpf_to_pdf/processData.js ./irpf_to_pdf/docGenerate.js ./irpf_to_pdf/composers.js ./irpf_to_pdf/renders.js > ./irpf_to_pdf/public/irpf-to-pdf.js
```


### LANÇAMENTOS
```
cat ./entry/vars.js ./entry/utils.js ./entry/server.js ./entry/events.js ./entry/composers.js > ./entry/public/entry.js
```

### CORAÇÃO

```
cat ./core/constants.js ./core/utils.js ./core/menu.js ./core/actions.js ./core/b3.js ./core/import.js ./core/ir.js ./core/lancamento.js ./core/pm.js ./core/print.js ./core/tesouro.js > ./core/public/core.js
```

### IMPORTAÇÃO
```
cat ./import/import.js > ./import/public/import.js
```

### GERAL
```
sh ./devtools/settings.sh
```