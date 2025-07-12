import {reset, seed} from 'drizzle-seed'
import {db,sql} from './connection.ts'
import {schema} from './schema/index.ts'

await reset(db,schema)

await seed(db,schema).refine((f) => {
    return{
        rooms:{
            count:2,
            columns:{
                name: f.string({ minLength: 5, maxLength: 50 }),
                description: f.string({ minLength: 20, maxLength: 200 }),
            }
        },
        questions:{
            count:20,
        }
    }
})

await sql.end()
