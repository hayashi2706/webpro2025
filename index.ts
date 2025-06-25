// 生成した Prisma Client をインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // 実行されたクエリをログに表示する設定
  log: ['query'],
});

async function main() {
  // Prisma Client を使ってデータベースに接続したことを知らせる
  console.log("Prisma Client を初期化しました。");

  // 【追加前】のユーザー一覧を取得して表示
  const usersBefore = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", usersBefore);

  // 新しいユーザーを追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // 【追加後】のユーザー一覧をもう一度取得して表示
  const usersAfter = await prisma.user.findMany();
  console.log("After ユーザー一覧:", usersAfter);
}

// main 関数を実行する
// 途中でエラーが起きても、最後に必ずデータベースとの接続を切るようにする
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // データベースとの接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });