const { Router } = require('express');
const videogamesRoutes = require('./videogamesRoutes')
const genresRoutes = require('./genresRoutes')
const platformsRoutes = require('./plataformasRoutes')

//const genresRoutes = require('./genresRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoutes)
router.use("/genres", genresRoutes)
router.use("/plataformas", platformsRoutes)


module.exports = router;
