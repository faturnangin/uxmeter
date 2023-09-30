import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('nanginsuxmeter', 12)
  const user = await prisma.users.upsert({
    where: { email: 'workwithnangin@gmail.com' },
    update: {},
    create: {
      email: 'workwithnangin@gmail.com',
      name: 'nangin',
      password
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })