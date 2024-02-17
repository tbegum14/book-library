const { Reader } = require("../models");

const createReader = async (req, res) => {
	try {
		const createReader = await Reader.create(req.body);
		res.status(201).json(createReader);
	} catch (error) {
		res.send(500).json(error);
	}
};

const findReaders = async (_, res) => {
    try {
        const findReaders = await Reader.findAll()
        res.status(200).json(findReaders)
    } catch(error){
        res.status(500).json(error)
    }
};

const findReader = async(req, res) => {
    const {id} = req.params
    try{
        const findReader = await Reader.findByPk(id)
        if(!findReader){
            return res.status(404).json({error: 'The reader could not be found.'})
        }
        res.status(200).json(findReader)

    }catch(error){
        res.status(500).json(error)
    }
}

const updateReaderById = async(req, res) => {
    const {id} = req.params
    const {name, email} = req.body
    let params;
    try{
        if (name&email){
            params = {name: name, email: email}
        }
        else if(name){
            params = {name: name}
        }
        else if (email){
            params = {email: email}
        }
        const updatedReader = await Reader.update(params, {where:{id:id}})
        const updatedReaderRecord = await Reader.findByPk(id)
        if(!updatedReaderRecord){
            return res.status(404).json({error: 'The reader could not be found.'})
        }
        res.status(200).json(updatedReaderRecord)

    }catch(error){
        res.status(500).json(error)
    }
}

const deletedReaderById = async (req, res)=>{
    const {id} = req.params
    try{
        const currentReaderRecord = await Reader.findByPk(id)

        if(!currentReaderRecord){
            return res.status(404).json({error: 'The reader could not be found.'})
        }

        const deletedReader = await Reader.destroy({where:{id:id}})
        const deletedReaderRecord = await Reader.findByPk(id)

        res.status(204).json(deletedReaderRecord)
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports = { createReader, findReaders, findReader, updateReaderById, deletedReaderById };
