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

db.posts.aggregate([{  
$unwind: "$comments"  
}, {  
$group: {  
_id: "$comments.author",  
count: {  
$sum: 1  
}  
}  
}, {  
$sort: {  
"count": 1  
}  
}, {  
$group: {  
_id: null,  
name_mas: {  
$last: "$_id"  
},  
number_mas: {  
$last: "$count"  
},  
name_menos: {  
$first: "$_id"  
},  
number_menos: {  
$first: "$count"  
}  
}  
}])




*/

/* Mongo-queries-2
Crear una bd “libreria” y cargar los scripts adjuntos con el comando load("nombrefichero") desde el mongo shell.

Lanzar las siguientes queries:

Obtener todos los autores
Obtener los autores cuyo apellido sea DATE
db.libros.find({"autor.apellidos":"DATE"}).limit(1)

Obtener los libros editados en 1998 o en 2005
db.libros.find({"anyo":{$in:[1998],2005}}}).pretty


Obtener el número de libros de la editorial Addison‐Wesley
Obtener el libro que ocupa la tercera posición
Obtener la lista de autores de cada libro junto con el título
Obtener los títulos de libro publicados con posterioridad a 2004.
Obtener los libros editados desde 2001 y precio mayor que 50
db.libros.find({$and:[{"anyo"}:{$gte:"2001"}}, {"precio":{$gt:50}}]},{"_id":0, "titulo":1, "precio":1, "anyo": 1}) 


Obtener los libros publicados por la editorial Addison‐Wesley después de 2005.


Obtener el título de libro y editorial para aquellos libros que tengan un precio superior a 50€.
Obtener los libros publicados en 1998 o a partir de 2005.
 */




