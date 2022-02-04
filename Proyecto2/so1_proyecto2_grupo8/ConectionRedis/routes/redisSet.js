"use strict";

const redisConnection = require("../controllers/redis-connection");
const redis = new redisConnection();

(async () => {
    try {
        // Para este caso haremos uso de un JSON, tambien se puede guardar string, int, double, etc.
        let data = [{
                "_id": "5c21d04d34b4a04750f9aa6f",
                "index": 0,
                "guid": "c9f32788-0116-48e9-86d5-9c7649f70c58",
                "friends": [{
                        "id": 0,
                        "name": "Tania Cardenas"
                    },
                    {
                        "id": 1,
                        "name": "Cherry Bishop"
                    },
                    {
                        "id": 2,
                        "name": "Simpson French"
                    }
                ]
            },
            {
                "_id": "5c21d04db527f89279d44902",
                "index": 1,
                "guid": "144ef286-f059-4a62-98ca-b54c5130a4d7",
                "friends": [{
                        "id": 0,
                        "name": "Vaughn Ratliff"
                    },
                    {
                        "id": 1,
                        "name": "Delores Glover"
                    },
                    {
                        "id": 2,
                        "name": "Jayne Puckett"
                    }
                ]
            }
        ];
        // NOTA: cuando lo que se quiere registrar es un json o array, debemos de usar el JSON.strinify 
        await redis.set("dataPrueba", JSON.stringify(data));
    } catch (error) {
        console.log(`Error al procesar: ${error}`);
    }
})();