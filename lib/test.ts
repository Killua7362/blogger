const {PrismaClient} = require('@prisma/client')
const db =new PrismaClient();

async function main() {
    try{
       await db.user.create({
            data:{
                name:'second',
                email:'description',
            }        
        })
    }catch(error){

    }finally{
        await db.$disconnect()
    }
}
main()