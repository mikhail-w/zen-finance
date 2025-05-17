import { auth } from '@clerk/nextjs';

async function main() {
  const { userId } = await auth();
  console.log('Your user ID is:', userId);
}

main().catch(console.error); 