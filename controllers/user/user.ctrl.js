const {models, City, User} = require('../../models')

exports.get_all_users = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_one_user_by_email = async (req, res) => {
    const {email} = req.body
    try {
        const user = await City.findOne({
            where : {
                email : email
            }
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_one_user_by_id = async (req, res) => {
    const {id} = req.body
    try {
        const user = await User.findByPk(id)
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_user = async (req, res) => {
    const {email, nickname, dateofbirth, profile_image} = req.body
    try {
        const user = await User.create({
            email: email,
            nickname: nickname,
            dateofbirth: dateofbirth,
            profile_image: profile_image,
            storedCities: []
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.update_user = async (req, res) => {
    const {id, email, password, nickname, dateofbirth, storedCities} = req.body
    try {
        const user = await User.findByPk(id);
 
        user.email = email
        user.password = password
        user.nickname = nickname
        user.dateofbirth = dateofbirth
        user.storedCities = storedCities

        await user.save()

        return res.json(user)

    } catch (err) {

        console.log(err)
        return res.status(500).json(err)

    }
}

exports.delete_user_by_id = async (req, res) => {
    const {id} = req.body
    try {
        const user = await User.findByPk(id);
        await user.destroy()
        return res.json({message : 'User successfully deleted'})
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.delete_user_by_email = async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.findByOne({
            where : {
                email : email
            }
        });
        await user.destroy()
        return res.json({message : 'User successfully deleted'})
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.addStoredCity = async (req, res) => {
    const {id, sido_sgg} = req.body
    try {
        console.log("sido_sgg: ", sido_sgg)
        // console.log("array typeof: ", typeof [1])
        const user = await User.findByPk(id)
        const newStoredCities = user.storedCities

        // if the city is already included in the storedCities array, do nothing
        if (newStoredCities.includes(sido_sgg)) {
            return res.json(user)
        }

        newStoredCities.push(sido_sgg)
        user.storedCities = newStoredCities

        // for Array datatypes in sequelize, we need to set the variable of array datatype as changed so that sequelize detect it as changed
        user.changed('storedCities', true)
        await user.save()

        return res.json(user.storedCities)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.deleteStoredCity = async (req, res) => {
    const {id, sido_sgg} = req.body
    try {
        console.log("sido_sgg: ", sido_sgg)
        // console.log("array typeof: ", typeof [1])
        const user = await User.findByPk(id)
        const idx = user.storedCities.indexOf(sido_sgg)

        // if the city is not stored in storedCities array, do nothing
        if (idx == -1) {
            return res.json(user)
        }

        user.storedCities.splice(idx, 1)

        // for Array datatypes in sequelize, we need to set the variable of array datatype as changed so that sequelize detect it as changed
        user.changed('storedCities', true)
        await user.save()

        return res.json(user.storedCities)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

function http2https(profile_image) {
    return profile_image.replace('http://', 'https://')
}

exports.login = async (req, res) => {
    console.log("entered login")
    const {email, nickname, profile_image, dateofbirth} = req.body
    const secure_profile_image = http2https(profile_image)
    try {
        // see if the user already has an account
        const user = await User.findOne({
            where : {
                email : email
            }
        })

        console.log("found user: ", user)

        // if not, create account and login
        if (user == null) {
            // creating new account
            const newUser = await User.create({
                email : email,
                nickname : nickname,
                profile_image: secure_profile_image,
                dateofbirth: dateofbirth,
                storedCities: []
            })
            return res.json(newUser)
        }
        // if yes, do not create new account but login with existing account
        else {
            return res.json(user)
        }

        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.getStoredCitiesDetail = async (req, res) => {
    const {storedCities} = req.body
    var storedCitiesDetail = new Array()
    try {

        for (var i = 0; i < storedCities.length; i++) {
            var city = await City.findByPk(storedCities[i])
            storedCitiesDetail.push(city)
        }

        return res.json(storedCitiesDetail)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// exports.name = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }