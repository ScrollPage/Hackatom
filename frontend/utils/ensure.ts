import cookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export const ensureRedirectToData = (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const token = cookies(ctx)?.token;
  if (token) {
    const userId = cookies(ctx)?.userId;
    ctx.res.writeHead(302, { Location: `/profile/${userId}?redirected=true` });
    ctx.res.end();
    return;
  }
}

export const ensureAuth = (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const token = cookies(ctx)?.token;
  if (!token) {
    ctx.res.writeHead(302, { Location: '/?redirected=true' });
    ctx.res.end();
    return;
  }
}