const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Category = require('../models/Category')
const Product = require('../models/Product')

exports.getCategoryList = async function (req, res) {
    try {
        var categoryList =  await Category.getCategoryList()
        for(let item of categoryList) {
            item.productList = await Product.getProductListByCategoryId(item.Id)
        }
        res.status(200).json({
            categoryList: categoryList,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.getProductListWithoutCategory = async function (req, res) {
    try {
        var productList =  await Product.getProductListWithoutCategory()
        res.status(200).json({
            productList: productList,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.getCategory = async function (req, res) {
    try {
        var category =  await Category.getCategory(req.params.id)
        category.productList = await Product.getProductListByCategoryId(req.params.id) || []
        res.status(200).json({
            category: category
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.createCategory = async function (req, res) {
    try {
        var info = {
            name: req.body.name, 
            note: req.body.note, 
        }
        var categoryId =  await Category.createCategory(info)

        if(req.body.productList.length > 0) {
            req.body.productList.forEach(async(id) => {
                await Product.editProduct({categoryId: categoryId},id)
            })
        }

        var category =  await Category.getCategory(categoryId)
        category.productList = await Product.getProductListByCategoryId(categoryId)

        res.status(200).json({
            category: category,
            success: true,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.editCategory = async function (req, res) {
    try {
        var data = {
            name: req.body.name, 
            note: req.body.note, 
            status: req.body.status
        }

        var categoryId = req.body.Id

        await Product.editProductByCategoryId({categoryId: null}, categoryId)

        req.body.productList.forEach(async(id) => {
            await Product.editProduct({categoryId: categoryId},id)
        })

        await Category.editCategory(data, categoryId)
        var category =  await Category.getCategory(categoryId)
        category.productList = await Product.getProductListByCategoryId(categoryId)

        res.status(200).json({
            category: category
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.deleteCategory = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await Category.deleteCategory(id)
            await Product.editProductByCategoryId({categoryId: null}, id)
        });
        res.status(200).json({
            success: true,
            numDelete: idList.length
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};

exports.searchCategory = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var categoryList = await Category.searchCategory(searchString)
        for(let item of categoryList) {
            item.productList = await Product.getProductListByCategoryId(item.Id)
        }
        res.status(200).json({
            success: true,
            categoryList: categoryList
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};