const productModel = require('../models/product')


const getAllProductsStatic = async (req, res) => {
    const products = await productModel.find({ price: { $gt: 109 } })
    const count = await productModel.count({ price: { $gt: 109 } })
    console.log(count)
    res.status(200).json(products)
}

const getALllproducts = async (req, res) => {
    let { featured, name, company, search, sort, fields, numericFilters } = req.query;
    let query = {};
    if (featured) {
        query.featured = featured === 'true' ? true : false
    }
    if (name) {
        query.name = name
    }
    if (company) {
        query.company = company
    }

    // query.name = { $regex: search, $options: 'i' }

    let result = productModel.find(query);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    else {
        result = result.sort("createdAt")
    }
    // select fields
    if (fields) {
        const fieldsList = feilds.splite(',').join(' ');
        result = result.select(fieldsList);
    }
    if (numericFilters) {
        console.log(numericFilters)
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        console.log(numericFilters)
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        console.log(filters)
        // we have a string numericFilters and we have a regEx 
        // we gonna loop on the string and at moment we find a substring match one of element of regEx we gonna replace him with the value of function
        // we complete the rest of string
        // 
        // we wanna send in query like this :
        // {price : {operator : value}, rating: operator : value} also : filters his like : "option-operator-value, option-operator-value , ... "   
        const options = ["price", "rating"]
        filters = filters.split(',').map((item) => {
            const [option, operator, value] = item.split("-")
            if (options.includes(option)) {
                query = { ...query, [option]: { [operator]: Number(value) } }
            }
        })

    }
    // pagination and limit 
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    // 
    const products = await result
    res.status(200).send(products)
}


module.exports = { getALllproducts, getAllProductsStatic }