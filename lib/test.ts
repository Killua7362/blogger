const {PrismaClient} = require('@prisma/client')
const db =new PrismaClient();

async function main() {
    try{
       await db.posts.create({
            data:{
                title:'second',
                description:'description',
                article:'article'
            }        
        })
    }catch(error){

    }finally{
        await db.$disconnect()
    }
}
main()