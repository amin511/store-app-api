const { Router } = require("express");
const { getALllproducts, getAllProductsStatic } = require("../controllers/products");

const router = Router();


router.route('/').get(getALllproducts);
router.route('/static').get(getAllProductsStatic)



module.exports = router;