import React from 'react'
import {useEffect, useState,FC} from 'react'
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import {getAllRecipe} from "../lib/get_all_recipes"
import type {Recipe} from '../types/recipe'
import type {Response} from '../lib/get_all_recipes'
import {RecipeLink} from '../components/RecipeLink'
import { SearchBar } from '../components/SearchBar';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

const next_style = css`
    float: right;
`


type Props = {
  response: Response
  page
};

const Home: NextPage<Props> = (props) => {
  const recipes = props.response.recipes;
  let prev, next;
  if(props.response.links.prev !== undefined) prev = props.response.links.prev.split("=").pop();
  if(props.response.links.next !== undefined) next = props.response.links.next.split("=").pop();
  
  const router = useRouter();
  //const [number, setNumber] = useState<number>(1);
  return (
    <div>
       <Link href='/'><h1>My Recipe Site</h1></Link> 
       <Link
              href = {{
                  pathname: '/en',
                  query: {page: props.page}
              }}
              >English</Link>
              
      <SearchBar />
      {
      recipes.map((recipe, i) => (
                    <div key={i}><RecipeLink recipe={recipe} /></div>
                ))
      }
      {
          (() => {
              if(prev !== undefined) return <Link
              href = {{
                  pathname: '/',
                  query: {page: prev}
              }}
              >PREV</Link>
          })()
      }
      
      {
          (() => {
              if(next !== undefined) return <Link
              href = {{
                  pathname: '/',
                  query: {page: next}
              }}
              　>NEXT</Link>
          })()
      }
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query?.page);

  if(isNaN(page)){
    return {
      props: {
        response: await getAllRecipe(1, process.env.API_KEY),
        page:1
      },
    }
  }else{
    return {
      props:{
        response: await getAllRecipe(page, process.env.API_KEY),
        page:page
      }
    }
  };
}

export default Home;