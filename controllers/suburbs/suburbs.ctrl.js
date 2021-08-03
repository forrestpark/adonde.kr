const {models, Suburbs} = require('../../models')

exports.get_all_terminals = async (req, res) => {
    try {
        const terminals = await Suburbs.findAll()
        return res.json(terminals)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.find_terminal = async (req, res) => {
    const {id} = req.body

    try {
        const terminal = await Suburbs.findByPk(id)
        return res.json(terminal)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_terminal = async (req, res) => {
    const {id, name, sido, sgg, sido_sgg} = req.body
    try {
        const terminal = await Suburbs.create({id, name, sido, sgg, sido_sgg})
        return res.json(terminal)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.update_terminal = async (req, res) => {
    const {id, name, sido, sgg, sido_sgg} = req.body
    try {
        const terminal = await Suburbs.findByPk(id)
        terminal.name = name
        terminal.sido = sido
        terminal.sgg = sgg
        terminal.sido_sgg = sido_sgg

        await terminal.save()
        return res.json(terminal)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.delete_terminal = async (req, res) => {
    const {id} = req.body
    try {
        const terminal = await Suburbs.findByPk(id)
        
        await terminal.destroy()
        return res.json(terminal)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.find_any_by_sido_sgg = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const terminal = await Suburbs.findOne({
            where : {
                sido_sgg : sido_sgg
            }
        })
        return res.json(terminal)
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