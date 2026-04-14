> ## Red

- Obtiene los resultados de los pings de todas las IPs del segmento.

<details>
    <summary><code>GET</code> <code>/api/ping</code></summary>

#### Responses
> | Código HTTP | Respuesta                                                |
> | ----------- | -------------------------------------------------------- |
> | `200`       | `{"pings": pings}`                                       |
> | `500`       | `{"type": "error", "message": "Internal server error."}` |
</details>

<br>

- Obtiene el resultado de un ping a una IP específica.

<details>
    <summary><code>GET</code> <code>/api/ping/{ip}</code></summary>

#### Params
> | Nombre | Tipo     | Descripción               |
> | ------ | -------- | ------------------------- |
> | `ip`   | `string` | Dirección IP a consultar. |

#### Responses
> | Código HTTP | Respuesta                                                |
> | ----------- | -------------------------------------------------------- |
> | `200`       | `{"alive": boolean }`                                    |
> | `500`       | `{"type": "error", "message": "Internal server error."}` |
</details>

<br>

- Obtiene los detalles de red de todas las IPs del segmento.

<details>
    <summary><code>GET</code> <code>/api/net</code></summary>

#### Responses
> | Código HTTP | Respuesta                                                |
> | ----------- | -------------------------------------------------------- |
> | `200`       | `{"netInfo": netInfo}`                                   |
> | `500`       | `{"type": "error", "message": "Internal server error."}` |
</details>

<br>

- Obtiene el detalle de red de una IP en específico.

<details>
    <summary><code>GET</code> <code>/api/net/{ip}</code></summary>

#### Params
> | Nombre | Tipo     | Descripción               |
> | ------ | -------- | ------------------------- |
> | `ip`   | `string` | Dirección IP a consultar. |

#### Responses
> | Código HTTP | Respuesta                                                |
> | ----------- | -------------------------------------------------------- |
> | `200`       | `{"netInfo": netInfo}`                                   |
> | `500`       | `{"type": "error", "message": "Internal server error."}` |
</details>
