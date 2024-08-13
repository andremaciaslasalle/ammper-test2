# Pantalla para enviar correos

1. Crear una pantalla con un formulario que permita enviar correos electrónicos, los campos del formulario deben incluir:
    * Destinatario
    * Emisor
    * Asunto
    * Cuerpo del correo (body)
    * Campo para adjuntar un documento (al menos un pdf)
    * Enlace en el cuerpo del correo, puede ser cualquiera (google.com, ammper.com, etc)
    * Utilizar AWS Pinpoint para el envío de correos electrónicos, usar free tier para evitar costos al desarrollador.
2. Pantalla de Dashboard.
Crear una segunda pantalla que funcione como un pequeño dashboard.
Este dashboard debe mostrar las métricas (KPIs y gráficas) relacionadas con los correos electrónicos enviados, utilizando los datos de seguimiento obtenidos de AWS Pinpoint.
* Si los correos se abrieron o no.
* Si los correos fueron marcados como SPAM.
* Si los correos se abrieron y luego se borraron.
* Si los enlaces y documentos adjuntos fueron abiertos.

# Requisitos Técnicos
* Utilizar React o Next.js para el desarrollo del frontend.
* Asegurar la validación adecuada de los campos del formulario.
* Integrar AWS Pinpoint para el envío y seguimiento de correos electrónicos.
* Utilizar una biblioteca de gráficos (por ejemplo, Chart.js, Recharts) para la visualización de las métricas en el dashboard.
* Asegurar que la aplicación sea responsiva y funcione correctamente en diferentes dispositivos y tamaños de pantalla.

# Pasos para correr la aplicación:
La aplicación se creó con Vite, para correrla debemos asegurarnos que tenemos instalado Yarn en el equipo, en caso contrario, correr el siguiente comando:
```
npm install --global yarn
```

Para correr el app en local:
```
yarn run dev
```