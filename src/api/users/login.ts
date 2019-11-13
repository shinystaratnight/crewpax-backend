export async function login(ctx: any, next: any): Promise<void> {
  ctx.body = "Sign In"
}

export async function loginWithMobile(ctx: any, next: any): Promise<void> {
  ctx.body = "Sign In With Mobile"
}