//ここって要するにメインページと同じこと書けばいいんじゃない？
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React ,{useEffect,useState,FC} from 'react';
import {resourceUsage} from 'node:process';

import { SearchBar } from '../components/SearchBar'
import { RecipeLink } from '../components/RecipeLink'
import { getRecipesByKeyword } from '../lib/get_recipe_by_keyword';
import type {Response} from '../lib/get_all_recipes'


type Props = {
    response: Response
    page,
    keyword:string
  };

const SearchPage: NextPage<Props> = (props) => {
    const recipes = props.response.recipes;
    let prev, next;
    if(props.response.links.prev !== undefined) prev = props.response.links.prev.split("=").pop();
    if(props.response.links.next !== undefined) next = props.response.links.next.split("=").pop();
    //console.log(props.response);
    //console.log(next);
    const router = useRouter();
    let title_next = props.response.links.next;
    let title;
    if(title_next !== undefined){
        title = decodeURI(title_next);
        title = title?.toString().split('=')[1].split('&')[0];
        title = title+'の検索結果'
    }
    
    if(recipes.length == 0){
        title = '検索結果がありません'
    }

    return (
      <div>
        <Link href='/'><h1>My Recipe Site</h1></Link>
        <Link
              href = {{
                  pathname: '/en/search',
                  query: {page: props.page,keyword:props.keyword}
              }}
       >English</Link>

        <SearchBar />
        <h2>{title}</h2>
        {
        recipes.map((recipe, i) => (
                      <div key={i}><RecipeLink recipe={recipe} /></div>
                  ))
        }

        {
            (() => {
                if(prev !== undefined) return <Link
                href = {{
                    pathname: '/search',
                    query: {keyword: router.query.keyword,page: prev}
                }}
                >PREV</Link>
            })()
        }
        
        {
            (() => {
                if(next !== undefined) return <Link
                href = {{
                    pathname: '/search',
                    query: {keyword: router.query.keyword,page: next}
                }}
                >NEXT</Link>
            })()
        }
      </div>
    )
  };


export const getServerSideProps: GetServerSideProps = async (context) => {
    const keyword = String(context.query?.keyword);
    const page = Number(context.query?.page); //pageパラメーターを受け取る

    console.log(keyword);
    console.log(page);
    if(keyword === undefined || keyword === null) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    if(isNaN(page)) { //不正なパラメーターならデフォルトとして1を返す
        console.log('######################');
        return {
            props: {
                response: await getRecipesByKeyword(encodeURIComponent(keyword), 1, process.env.API_KEY),
                page:1,
                keyword:keyword
            }
            
        }
    }
    else {
        console.log('******************');
        return { //ページパラメーターが存在するなら対応したデータを返す
            props: {
                response: await getRecipesByKeyword(encodeURIComponent(keyword), page, process.env.API_KEY),
                page:page,
                keyword:keyword
            }
            
        };
    }
}

export default SearchPage;