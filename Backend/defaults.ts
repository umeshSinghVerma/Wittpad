const prisma = require('./prisma/index');
async function generateUser() {
    await prisma.$connect();
    console.log("Starting")
    const user = await prisma.user.create({
        data:{
            name:"Kyle",
            email:"kyle@test.com",            
        }
    });
    console.log(user);
}
generateUser()
    .catch(e=>{
        console.error(e.message);
    })
    .finally(async ()=>{
        await prisma.$disconnect()
    })