import api from '@/services/axios';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    const token = cookies['@cf.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    try {
      return await fn(context);
    } catch (error) {
      // if(error instanceof AuthTokenError) {
      destroyCookie(context, '@cf.token')

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
      // }
    }
  }
}