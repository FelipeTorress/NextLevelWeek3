const Database = require('./database/db')
const saveOrphanage = require('./database/saveOrphanage')

module.exports = {
    index(request, response){
        return response.render('index')
    },

    async orphanage(request, response){
        const id = request.query.id

        try{
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            //result vem um array de uma posição
            const orphanage = results[0]
            //transformando as strings das imagens em array
            orphanage.images = orphanage.images.split(",") 
            orphanage.firstImage = orphanage.images[0]
            
            //transformando opening_hour em boolean
            orphanage.open_on_weekends == "0"? orphanage.open_on_weekends = false : orphanage.open_on_weekends = true 

            return response.render('orphanage', { orphanage })
        }catch(error){
            console.log(error)
            return response.send("Erro no banco de dados!")
        }
    },

    async orphanages(request, response){
        try{
            const db = await Database;
            const orphanages = await db.all( "SELECT * FROM orphanages")
            return response.render('orphanages', { orphanages })
        }catch(error){
            console.log(error)
            return response.send("Erro no banco de dados!")
        }
    },

    createOrphanage(request, response){
        return response.render('create-orphanage')
    },

    async saveOrphanage(request, response){
        const fields = request.body
        
        //validar se todos os campos estão preenchidos
        if(Object.values(fields).includes('')){//pegando os valores do objeto e transformando em array e devolvendo true se tiver um campo vazio
            return response.send('Todos os campos devem ser preenchidos!')
        }
        
        try{
            //salvar o orfanato 
            const db = await Database
            await saveOrphanage(db,{
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images : fields.images.toString(),
                instructions: fields.instructions,
                opening_hour: fields.opening_hour,
                open_on_weekends: fields.open_on_weekends
            })

            //redirecionamento
            return response.redirect('/orphanages')
        }catch(error){
            console.log(error)
            return saveOrphanage('Erro no banco de dados')
        }
    }
}