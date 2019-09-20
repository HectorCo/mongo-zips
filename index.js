db.zips.aggregate([
  { $group: { _id: "$state", totalpop: { $sum: "$pop" } } },
  { $match: { totalpop: { $gte: 10 * 000 * 000 } } }
]);

db.zips.find({ city: /^A/ }); // Busca todas las ciudades que empiezan por A

b.sesiones.aggregate(
  // aggregate significa que vamos a agrupar
  [
    // lista de operaciones, a realizar en secuencia
    {
      // en este caso solo una operación, agrupar
      $group: {
        _id: "$city", // agrupamos por nombre
        // nueva clave, num_sesiones
        num_sesiones: { $sum: 1 } // cuenta el num.elementos en el grupo
      }
    }
  ]
);

db.zips.aggregate([
  { $match: { $or: [{ city: /^A/ }, { city: /^B/ }] } },
  { $group: { _id: { city: "$city" }, poblacion: { $sum: "$pop" } } },
  {
    $group: {
      _id: null,
      total: { $sum: "$poblacion" }
    }
  }
]);

db.zips.aggregate([
  { $group: { $or: [{ state: "NY" }, { state: "CA" }] } },

  { $match: { $pop: { $gt: 25000 } } }
]);

db.zips.aggregate([
  {
    $match: {
      state: {
        $in: ["CA", "NY"]
      }
    }
  },
  {
    $group: {
      _id: {
        state: "$state",
        city: "$city"
      },
      poblacion: {
        $sum: "$pop"
      }
    }
  },
  {
    $match: {
      poblacion: { $gt: 25000 }
    }
  },
  {
    $group: {
      _id: null,
      media: { $avg: "$poblacion" }
    }
  },
  {
    $project: {
      redondeado: { $round:[ "$media", 0] }
    }
  }
])



/* 


- Obtener la población total de las ciudades cuyo nombre empieza por A o B

db.zips.aggregate([
  { $match: { $or: [{ city: /^A/ }, { city: /^B/ }] } },
  { $group: { _id: { city: "$city" }, poblacion: { $sum: "$pop" } } },
  {
    $group: {
      _id: null,
      total: { $sum: "$poblacion" }
    }
  }
]);



- Obtener la media de población de entre todas las ciudades de Nueva York y California cuya población
supera los 25000 ciudadanos.

db.zips.aggregate([
  {
    $match: {
      state: {
        $in: ["CA", "NY"]
      }
    }
  },
  {
    $group: {
      _id: {
        state: "$state",
        city: "$city"
      },
      poblacion: {
        $sum: "$pop"
      }
    }
  },
  {
    $match: {
      poblacion: { $gt: 25000 }
    }
  },
  {
    $group: {
      _id: null,
      media: { $avg: "$poblacion" }
    }
  }
])



- Obtener los usuarios que han hecho más comentarios y los que han hecho menos de entre todos los
posts de un blog. (tip: usar la cláusula unwind para crear un documento por cada comentario de cada
post (que inicialmente estarían en un array dentro de el post correspondiente). 




*/
