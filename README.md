[`https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes)

```
npx try-prisma@latest --template typescript/rest-nextjs-api-routes
```

Create and seed the database

```
npx prisma migrate dev --name init
```

## Evolving the app

adding a new model to your [Prisma schema file](./prisma/schema.prisma)

```diff
// schema.prisma

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  userId Int     @unique
+  user   User    @relation(fields: [userId], references: [id])
+}
```

updated data model

```
npx prisma migrate dev
```

## Update your application code

Install Prisma Client

```
npm install @prisma/client
```

new file .\prisma\generate\addProfile.ts

#### [Create a new profile for an existing user](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes#create-a-new-profile-for-an-existing-user)

```ts
// addProfile.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.create({
    data: {
      bio: "Hello World",
      user: {
        connect: { email: "alice@prisma.io" },
      },
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```
npx ts-node .\prisma\generate\addProfile.ts
```

new file .\prisma\generate\addUserProfile.ts

#### [Create a new user with a new profile](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes#create-a-new-user-with-a-new-profile)

new file .\prisma\generate\updateProfile.ts

#### [Update the profile of an existing user](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes#update-the-profile-of-an-existing-user)
