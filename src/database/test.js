const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then( async db => {
    await saveOrphanage(db, {
        lat:"-5.1252114",
        lng:"-42.8030074",
        name:"Lar das Meninas",
        about:"Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
        whatsapp:"32202692",
        images : [
            "https://images.unsplash.com/photo-1574647267419-cd3adf200aed?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
            "https://images.unsplash.com/photo-1601564267675-0377e2501d4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
        ].toString(),
        instructions:"Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hourss:"Horário de Visita de 8h as 18h",
        open_on_weekends:"1"
    })

    const SelectedOrphanages = await db.all( "SELECT * FROM orphanages")
    
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "2"')

    await db.run('DELETE FROM orphanages WHERE id = 3')
    
})
