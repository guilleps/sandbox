# Sandbox

## Uso de NVM en Windows

Para gestionar versiones de Node.js, utiliza [nvm for Windows](https://github.com/coreybutler/nvm-windows).

### Instalación
1. Descarga e instala `nvm for Windows`.
2. Configura las versiones de Node.js necesarias:
	- **Frontend**: `20.11.1`
	- **Backend**: `20.0.0`
	
	```bash
	nvm install $version
	```

### Script para Windows
Utiliza el siguiente script para que el sistema reconozca el archivo `.nvmrc` y active la versión correspondiente de Node.js:
```bash
nvm use $(Get-Content .nvmrc)
```

## Uso de NVM en macOS

Para gestionar versiones de Node.js en macOS, asegúrate de tener instalado `nvm`.

### Script para macOS
Utiliza el siguiente comando para activar la versión de Node.js especificada en el archivo `.nvmrc`:
```bash
nvm use $(cat .nvmrc)
```


## Estructura
```
└── 📁capacitacion-instrategy
    └── 📁.github
        └── 📁workflows
            ├── ci-backend.yml
            ├── ci-frontend.yml
    └── 📁.husky
        ├── commit-msg
        ├── pre-push
    └── 📁.vscode
        ├── extensions.json
        ├── settings.json
    └── 📁sandbox-backend
        └── 📁functions
            ├── .nvmrc
            ├── package.json
    └── 📁sandbox-frontend
        ├── .nvmrc
        ├── package.json
```

## ⚙️ Instalación de dependencias
### ✅ Script recomendado (desde root)

Ejecuta en la raíz del proyecto:

```bash
npm run install:all
```

Este comando hará:

*   npm install en el root (usa Node 20.11.1)

*   npm install en sandbox-frontend (Node 20.11.1)

*   npm install en sandbox-backend/functions (Node 20.0.0)
